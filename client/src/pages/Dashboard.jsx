import { useState, useEffect } from 'react';
import { subscriptionService } from '../api/subscriptionService';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { Calendar, DollarSign, Package, Check } from 'lucide-react';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await subscriptionService.getMySubscription();
      setSubscription(response.data.subscription);
    } catch (error) {
      toast.error('Failed to load subscription');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Manage and view your subscription details
          </p>
        </div>

        {subscription ? (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    subscription.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {subscription.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                <p className="text-2xl font-bold text-gray-900">{subscription.plan_name}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="p-3 bg-green-100 rounded-xl mb-4 w-fit">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-gray-900">${subscription.price}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="p-3 bg-purple-100 rounded-xl mb-4 w-fit">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Started On</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(subscription.start_date)}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                <div className="p-3 bg-orange-100 rounded-xl mb-4 w-fit">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Valid Until</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(subscription.end_date)}
                </p>
              </div>
            </div>

            {/* Plan Features Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Plan Features</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subscription.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
                  >
                    <div className="shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Need to change your plan?</h3>
                  <p className="text-blue-100">
                    Upgrade, downgrade, or explore other subscription options
                  </p>
                </div>
                <a
                  href="/plans"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap"
                >
                  View All Plans
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                No Active Subscription
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                You don't have an active subscription yet. Browse our plans and get started today!
              </p>
              <a
                href="/plans"
                className="inline-block px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Browse Available Plans
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard