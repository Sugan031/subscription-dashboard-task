import api from './axios';

export const subscriptionService = {
  subscribe: async (planId) => {
    const response = await api.post(`/subscribe/${planId}`);
    return response.data;
  },

  getMySubscription: async () => {
    const response = await api.get('/my-subscription');
    return response.data;
  },

  getAllSubscriptions: async () => {
    const response = await api.get('/admin/subscriptions');
    return response.data;
  }
};