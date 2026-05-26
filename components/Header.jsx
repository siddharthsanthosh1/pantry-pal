import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Gradient page header with optional subtitle and dark-mode toggle.
 * Respects notch / status bar / Dynamic Island via safe area insets.
 */
export default function Header({ title, subtitle, rightAction }) {
  const { isDark, toggleTheme } = useTheme();
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
