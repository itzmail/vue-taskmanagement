import { defineStore } from 'pinia';
import router from '@/router';

interface AuthState {
  token?: string;
  user?: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('jwt_token') || '',
    user: localStorage.getItem('user') || '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string, username: string) {
      this.token = token;
      this.user = username;

      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user', username);
    },

    logout() {
      this.token = '';
      this.user = '';

      localStorage.removeItem('jwt_token');
      localStorage.removeItem('user');

      router.push('/login');
    }
  },
})
