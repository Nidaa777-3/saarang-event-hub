import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAppStore } from '../store';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const { isAuthenticated } = useAppStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    setTimeout(() => {
      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/(auth)/login');
      } else if (isAuthenticated && inAuthGroup) {
        router.replace('/(tabs)');
      }
    }, 10);
  }, [isAuthenticated, segments]);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F5F6F8' } }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="event/[id]" 
          options={{ 
            presentation: 'modal', 
            headerShown: false, 
          }} 
        />
      </Stack>
    </>
  );
}
