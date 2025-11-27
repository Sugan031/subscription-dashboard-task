import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken) => set({
        user,
        accessToken,
        isAuthenticated: true
      }),

      updateAccessToken: (accessToken) => set({ accessToken }),

      logout: () => set({
        user: null,
        accessToken: null,
        isAuthenticated: false
      }),

      isAdmin: () => {
        const state = useAuthStore.getState();
        return state.user?.role === 'admin';
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore;