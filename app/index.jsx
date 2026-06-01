import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import ScreenBackground from '../components/ScreenBackground';

export default function Index() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <ScreenBackground style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </ScreenBackground>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)/pantry" />;
}
