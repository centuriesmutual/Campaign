import { Circle, CircleEnvironments } from '@circle-fin/circle-sdk';

// Circle API configuration
const circle = new Circle(
  process.env.CIRCLE_API_KEY || '', // Your Circle API key
  CircleEnvironments.sandbox // Use CircleEnvironments.production for live environment
);

export interface WalletBalance {
  walletId: string;
  balance: string;
  currency: string;
  availableBalance: string;
  frozenBalance: string;
}

export interface EmployeeWallet {
  employeeId: string;
  walletId: string;
  walletAddress: string;
  balance: WalletBalance;
  lastUpdated: Date;
}

export class CircleWalletService {
  private circle: Circle;

  constructor(apiKey: string, environment: 'sandbox' | 'production' = 'sandbox') {
    this.circle = new Circle(
      apiKey,
      environment === 'production' ? CircleEnvironments.production : CircleEnvironments.sandbox
    );
  }

  /**
   * Get wallet balance for an employee
   */
  async getEmployeeWalletBalance(employeeId: string, walletId: string): Promise<WalletBalance | null> {
    try {
      const response = await this.circle.wallets.getWallet(walletId);
      
      if (response.data && response.data.data) {
        const wallet = response.data.data;
        return {
          walletId: wallet.id,
          balance: wallet.balances?.[0]?.amount || '0',
          currency: wallet.balances?.[0]?.currency || 'USD',
          availableBalance: wallet.balances?.[0]?.amount || '0',
          frozenBalance: '0' // Circle doesn't provide frozen balance directly
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      throw new Error('Failed to fetch wallet balance');
    }
  }

  /**
   * Get all wallets for an employee
   */
  async getEmployeeWallets(employeeId: string): Promise<EmployeeWallet[]> {
    try {
      const response = await this.circle.wallets.listWallets();
      
      if (response.data && response.data.data) {
        const wallets = response.data.data;
        return wallets.map(wallet => ({
          employeeId,
          walletId: wallet.id,
          walletAddress: wallet.address || '',
          balance: {
            walletId: wallet.id,
            balance: wallet.balances?.[0]?.amount || '0',
            currency: wallet.balances?.[0]?.currency || 'USD',
            availableBalance: wallet.balances?.[0]?.amount || '0',
            frozenBalance: '0'
          },
          lastUpdated: new Date()
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching employee wallets:', error);
      throw new Error('Failed to fetch employee wallets');
    }
  }

  /**
   * Create a new wallet for an employee
   */
  async createEmployeeWallet(employeeId: string, walletName?: string): Promise<EmployeeWallet | null> {
    try {
      const response = await this.circle.wallets.createWallet({
        idempotencyKey: `employee-${employeeId}-${Date.now()}`,
        description: walletName || `Employee ${employeeId} Wallet`
      });

      if (response.data && response.data.data) {
        const wallet = response.data.data;
        return {
          employeeId,
          walletId: wallet.id,
          walletAddress: wallet.address || '',
          balance: {
            walletId: wallet.id,
            balance: '0',
            currency: 'USD',
            availableBalance: '0',
            frozenBalance: '0'
          },
          lastUpdated: new Date()
        };
      }

      return null;
    } catch (error) {
      console.error('Error creating employee wallet:', error);
      throw new Error('Failed to create employee wallet');
    }
  }

  /**
   * Get transaction history for an employee wallet
   */
  async getWalletTransactions(walletId: string, limit: number = 50): Promise<any[]> {
    try {
      const response = await this.circle.wallets.getWalletTransactions(walletId, {
        limit: limit.toString()
      });

      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
      throw new Error('Failed to fetch wallet transactions');
    }
  }

  /**
   * Format currency amount for display
   */
  formatCurrency(amount: string, currency: string = 'USD'): string {
    const numericAmount = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(numericAmount);
  }
}

// Export singleton instance
export const circleWalletService = new CircleWalletService(
  process.env.CIRCLE_API_KEY || '',
  process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
);

export default circleWalletService;
