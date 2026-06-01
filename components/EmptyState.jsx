import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export default function EmptyState({ icon = 'basket-outline', message, hint }) {
  const { isDark } = useTheme();
  const textMain = isDark ? 'text-gray-300' : 'text-muted';
  const textSub = isDark ? 'text-gray-500' : 'text-muted/70';

  return (
    <View className="items-center justify-center py-16 px-8">
      <View
        className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${
          isDark ? 'bg-darkCard' : 'bg-accent'
        }`}
      >
        <Ionicons name={icon} size={40} color={isDark ? '#40916C' : '#2D6A4F'} />
      </View>
      <Text className={`${textMain} text-lg font-semibold text-center`}>{message}</Text>
      {hint ? (
        <Text className={`${textSub} text-sm text-center mt-2`}>{hint}</Text>
      ) : null}
    </View>
  );
}
