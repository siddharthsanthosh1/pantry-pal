import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * Gradient page header with dark-mode toggle and optional sign-out.
 */
export default function Header({ title, subtitle, rightAction, showSignOut = false }) {
  const { isDark, toggleTheme } = useTheme();
  const { signOut, user } = useAuth();
  const insets = useSafeAreaInsets();

  const gradientColors = isDark
    ? ['#1B4332', '#243044']
    : ['#2D6A4F', '#40916C'];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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
          <Pressable
            onPress={toggleTheme}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            accessibilityLabel="Toggle dark mode"
          >
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={22}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
