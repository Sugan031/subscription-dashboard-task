import { create } from 'zustand';

const useSubscriptionStore = create((set) => ({
  subscription: null,
  plans: [],

  setSubscription: (subscription) => set({ subscription }),
  setPlans: (plans) => set({ plans }),
  clearSubscription: () => set({ subscription: null })
}));

export default useSubscriptionStore;