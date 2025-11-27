import { useState, useEffect } from 'react';
import { subscriptionService } from '../api/subscriptionService';
import toast from 'react-hot-toast';

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await subscriptionService.getAllSubscriptions();
      setSubscriptions(response.data.subscriptions);
    } catch (error) {
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            All Subscriptions
          </h1>
          <p className="text-lg text-gray-600">
            Overview of all user subscriptions in the system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Subscriptions</p>
                <p className="text-3xl font-bold text-gray-900">{subscriptions.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cancelled</p>
                <p className="text-3xl font-bold text-red-600">
                  {subscriptions.filter(s => s.status === 'cancelled').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Plan</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Price</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Start Date</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">End Date</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {sub.user_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{sub.user_name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{sub.user_email}</td>
                    <td className="p-4">
                      <span className="font-semibold text-gray-900">{sub.plan_name}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-green-600">${sub.price}</span>
                      <span className="text-gray-500 text-sm">/mo</span>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">{formatDate(sub.start_date)}</td>
                    <td className="p-4 text-gray-600 text-sm">{formatDate(sub.end_date)}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          sub.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        {sub.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {subscriptions.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-1">No subscriptions found</p>
                <p className="text-gray-500">Subscriptions will appear here once users subscribe to plans</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;