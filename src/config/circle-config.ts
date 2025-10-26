// Circle API Configuration
// Copy this file to .env.local and add your actual API key

export const circleConfig = {
  // Get your API key from: https://developers.circle.com/
  apiKey: process.env.CIRCLE_API_KEY || 'your_circle_api_key_here',
  
  // Environment: 'sandbox' for testing, 'production' for live
  environment: (process.env.CIRCLE_ENVIRONMENT || 'sandbox') as 'sandbox' | 'production',
  
  // API Base URL (usually not needed to change)
  baseUrl: process.env.CIRCLE_API_BASE_URL || 'https://api-sandbox.circle.com'
};

// Validation function
export const validateCircleConfig = () => {
  if (!circleConfig.apiKey || circleConfig.apiKey === 'your_circle_api_key_here') {
    console.warn('Circle API key not configured. Please set CIRCLE_API_KEY in your environment variables.');
    return false;
  }
  return true;
};
