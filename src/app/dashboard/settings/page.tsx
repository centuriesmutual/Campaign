'use client';

import { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SupportRequest {
  integration: string;
  issue: string;
  description: string;
  email: string;
}

export default function SettingsPage() {
  const [connectedServices, setConnectedServices] = useState<string[]>([]);
  const [showConfirmSignOut, setShowConfirmSignOut] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [supportRequest, setSupportRequest] = useState<SupportRequest>({
    integration: '',
    issue: '',
    description: '',
    email: '',
  });

  const handleSignOut = () => {
    window.location.href = '/login';
  };

  const handleSupportRequest = (integration: string) => {
    setSelectedIntegration(integration);
    setSupportRequest(prev => ({ ...prev, integration }));
    setShowSupportModal(true);
  };

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the support request to your backend
    console.log('Support request:', supportRequest);
    setShowSupportModal(false);
    // Reset form
    setSupportRequest({
      integration: '',
      issue: '',
      description: '',
      email: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Marketing Hub</h1>
      </div>

      {/* Settings Title */}
      <div className="flex items-center space-x-2">
        <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
      </div>

      {/* Integrations Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Meta Ads Integration */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Meta Ads</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <XCircleIcon className="mr-1 h-4 w-4 text-gray-500" />
                Not Connected
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Connect your Meta Ads account to manage Facebook and Instagram advertising campaigns.</p>
            <div className="mt-auto">
              <button
                onClick={() => handleSupportRequest('Meta Ads')}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Google Workspace Integration */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Google Workspace</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <XCircleIcon className="mr-1 h-4 w-4 text-gray-500" />
                Not Connected
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Integrate with Google Workspace for seamless document and calendar management.</p>
            <div className="mt-auto">
              <button
                onClick={() => handleSupportRequest('Google Workspace')}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Salesforce Integration */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Salesforce</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <XCircleIcon className="mr-1 h-4 w-4 text-gray-500" />
                Not Connected
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Connect with Salesforce to sync customer data and campaign performance.</p>
            <div className="mt-auto">
              <button
                onClick={() => handleSupportRequest('Salesforce')}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Support Request Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Contact Support</h3>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmitSupport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Integration</label>
                <input
                  type="text"
                  value={selectedIntegration}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Issue Type</label>
                <select
                  value={supportRequest.issue}
                  onChange={(e) => setSupportRequest(prev => ({ ...prev, issue: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select an issue type</option>
                  <option value="connection">Connection Issues</option>
                  <option value="setup">Setup Help</option>
                  <option value="error">Error Messages</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={supportRequest.description}
                  onChange={(e) => setSupportRequest(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Please describe your issue..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={supportRequest.email}
                  onChange={(e) => setSupportRequest(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSupportModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign Out Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
              <p className="text-sm text-gray-500">Sign out from Marketing Hub</p>
            </div>
          </div>
          <button
            onClick={() => setShowConfirmSignOut(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showConfirmSignOut && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <ExclamationTriangleIcon className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Confirm Sign Out</h3>
            </div>
            <p className="text-gray-500 mb-6">Are you sure you want to sign out? You will need to sign in again to access Marketing Hub.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmSignOut(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 