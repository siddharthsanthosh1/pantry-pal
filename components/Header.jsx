import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { APP_GRADIENT } from '../constants/gradient';

/**
 * Gradient page header — matches login screen colors.
 */
export default function Header({ title, subtitle, rightAction, showSignOut = false }) {
  const { signOut, user } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={APP_GRADIENT.colors}
      start={APP_GRADIENT.start}
      end={APP_GRADIENT.end}
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: 24,
        paddingLeft: Math.max(insets.left, 20),
        paddingRight: Math.max(insets.right, 20),
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3 min-w-0">
          <Text className="text-white text-3xl font-bold tracking-tight" numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-white/80 text-base mt-1" numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View className="flex-row gap-2 shrink-0">
          {rightAction}
          {showSignOut && user ? (
            <Pressable
              onPress={signOut}
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              accessibilityLabel="Sign out"
            >
              <Ionicons name="log-out-outline" size={22} color="#fff" />
            </Pressable>
          ) : null}
        </View>
      </View>
    </LinearGradient>
  );
}
