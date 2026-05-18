import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const getApiUrl = () => {
  // Detect development machine IP (works perfectly inside physical devices, emulators, and Expo Go)
  const hostUri = Constants.expoConfig?.hostUri;
  const ip = hostUri ? hostUri.split(':')[0] : 'localhost';
  return `http://${ip}:5000/api`;
};

const API_URL = getApiUrl();
console.log('Connecting to Saarang Backend API at:', API_URL);

export const useAppStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  events: [],
  registrations: [],
  token: null,
  isLoading: false,

  // Initialize store: load token from storage, load events
  initStore: async () => {
    try {
      set({ isLoading: true });
      
      // Load events first (open endpoint)
      const eventsRes = await fetch(`${API_URL}/events`);
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        set({ events: eventsData });
      }

      // Load token and user
      const token = await AsyncStorage.getItem('saarang_token');
      const userData = await AsyncStorage.getItem('saarang_user');

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        set({ token, user: parsedUser, isAuthenticated: true });
        
        // Fetch registrations from server using token
        await get().fetchRegistrations(token);
      }
    } catch (err) {
      console.error('Error initializing store:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRegistrations: async (tokenVal) => {
    const activeToken = tokenVal || get().token;
    if (!activeToken) return;

    try {
      const res = await fetch(`${API_URL}/registrations`, {
        headers: { 'Authorization': `Bearer ${activeToken}` }
      });
      if (res.ok) {
        const regData = await res.json();
        set({ registrations: regData });
      }
    } catch (err) {
      console.error('Error fetching registrations:', err);
    }
  },

  login: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        await AsyncStorage.setItem('saarang_token', data.token);
        await AsyncStorage.setItem('saarang_user', JSON.stringify(data.user));
        set({ 
          token: data.token, 
          user: data.user, 
          isAuthenticated: true 
        });
        // Fetch user's registrations
        await get().fetchRegistrations(data.token);
        return true;
      } else {
        alert(data.error || 'Login failed');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Could not connect to API server');
      return false;
    }
  },

  signup: async (email, password, name) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        await AsyncStorage.setItem('saarang_token', data.token);
        await AsyncStorage.setItem('saarang_user', JSON.stringify(data.user));
        set({ 
          token: data.token, 
          user: data.user, 
          isAuthenticated: true 
        });
        await get().fetchRegistrations(data.token);
        return true;
      } else {
        alert(data.error || 'Signup failed');
        return false;
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Could not connect to API server');
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('saarang_token');
      await AsyncStorage.removeItem('saarang_user');
      set({ user: null, isAuthenticated: false, registrations: [], token: null });
    } catch (err) {
      console.error('Logout error:', err);
    }
  },

  registerForEvent: async (eventId) => {
    const token = get().token;
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/registrations/toggle`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId })
      });

      if (res.ok) {
        // Fetch refreshed registrations list
        await get().fetchRegistrations();
      }
    } catch (err) {
      console.error('Error toggling registration:', err);
    }
  },

  unregisterFromEvent: async (eventId) => {
    // Under backend API, both registering and unregistering use toggle endpoint
    await get().registerForEvent(eventId);
  }
}));
