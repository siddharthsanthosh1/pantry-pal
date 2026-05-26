import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';

/** Demo analytics — replace with real stats later. */
export default function AnalyticsCard({ savedCount }) {
  const { isDark } = useTheme();
  const display = savedCount > 0 ? savedCount : 12;
  const cardBg = isDark ? 'bg-darkCard' : 'bg-white';
  const textMain = isDark ? 'text-white' : 'text-primaryDark';
  const textSub = isDark ? 'text-gray-400' : 'text-muted';

  return (
    <Animated.View
      entering={FadeInUp.springify()}
      className={`${cardBg} mx-5 -mt-4 rounded-2xl p-4 flex-row items-center shadow-md border border-black/5`}
    >
      <View className="w-12 h-12 rounded-full bg-safe/20 items-center justify-center mr-3">
        <Ionicons name="leaf" size={26} color="#52B788" />
      </View>
      <View className="flex-1">
        <Text className={`${textMain} font-bold text-lg`}>
          You saved {display} foods this month
        </Text>
        <Text className={`${textSub} text-sm mt-0.5`}>
          Keep scanning labels to reduce waste 🌱
        </Text>
      </View>
    </Animated.View>
  );
}
