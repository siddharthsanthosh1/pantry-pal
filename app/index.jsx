import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Index() {
  const { user, initializing } = useAuth();
  const { isDark } = useTheme();

  if (initializing) {
    return (
      <View
        className={`flex-1 items-center justify-center ${isDark ? 'bg-darkBg' : 'bg-background'}`}
      >
        <ActivityIndicator size="large" color="#40916C" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)/pantry" />;
}
