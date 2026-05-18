import { create } from 'zustand';

const mockEvents = [
  {
    id: 'e1',
    title: 'Pop Night',
    date: '2026-06-15T20:00:00Z',
    description: 'Get ready for an electrifying night of music and dance at the main arena.',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c090be5c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e2',
    title: 'Rock Night',
    date: '2026-06-16T10:00:00Z',
    description: 'Learn about the latest advancements in Artificial Intelligence from industry leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e3',
    title: 'Spotlight',
    date: '2026-06-17T09:00:00Z',
    description: 'A 24-hour coding marathon to solve real-world problems. Cash prizes up for grabs!',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e4',
    title: 'Spotlight 2',
    date: '2026-06-18T18:00:00Z',
    description: 'Laugh your heart out with top comedians from around the country.',
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

export const useAppStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  events: mockEvents,
  registrations: [],

  login: async (email, pass) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && pass) {
          set({
            user: { id: 'u1', email, name: email.split('@')[0] },
            isAuthenticated: true,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },

  signup: async (email, pass, name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && pass && name) {
          set({
            user: { id: 'u2', email, name },
            isAuthenticated: true,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, registrations: [] });
  },

  registerForEvent: (eventId) => {
    set((state) => {
      if (!state.registrations.includes(eventId)) {
        return { registrations: [...state.registrations, eventId] };
      }
      return state;
    });
  },

  unregisterFromEvent: (eventId) => {
    set((state) => ({
      registrations: state.registrations.filter((id) => id !== eventId),
    }));
  },
}));
