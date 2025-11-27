import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { planService } from '../api/planService';
import { subscriptionService } from '../api/subscriptionService';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';

const Plans = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribingTo, setSubscribingTo] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await planService.getAllPlans();
      setPlans(response.data.plans);
    } catch (error) {
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    if (!isAuthenticated) {
      toast.error('Please login to subscribe');
      navigate('/login');
      return;
    }

    setSubscribingTo(planId);
    try {
      await subscriptionService.subscribe(planId);
      toast.success('Subscription successful!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Subscription failed';
      toast.error(message);
    } finally {
      setSubscribingTo(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect subscription plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                index === 1
                  ? 'border-blue-500 ring-4 ring-blue-100'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Popular Badge */}
              {index === 1 && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-xl text-gray-500 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Billed monthly
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={subscribingTo === plan.id}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 transform ${
                    index === 1
                      ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100`}
                >
                  {subscribingTo === plan.id ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    'Get Started'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            All plans include 30-day money-back guarantee
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Secure payment
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              24/7 support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;