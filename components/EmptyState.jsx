import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyState({ icon = 'basket-outline', message, hint, onGradient = false }) {
  const textMain = onGradient ? 'text-white' : 'text-muted';
  const textSub = onGradient ? 'text-white/70' : 'text-muted/70';
  const iconBg = onGradient ? 'bg-white/15' : 'bg-accent';
  const iconColor = onGradient ? '#fff' : '#2D6A4F';

  return (
    <View className="items-center justify-center py-16 px-8">
      <View className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${iconBg}`}>
        <Ionicons name={icon} size={40} color={iconColor} />
      </View>
      <Text className={`${textMain} text-lg font-semibold text-center`}>{message}</Text>
      {hint ? (
        <Text className={`${textSub} text-sm text-center mt-2`}>{hint}</Text>
      ) : null}
    </View>
  );
}
