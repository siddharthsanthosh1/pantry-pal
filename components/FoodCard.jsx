import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  formatExpirationDate,
  getUrgencyColor,
  URGENCY_LABELS,
} from '../utils/urgency';
const SWIPE_THRESHOLD = 80;

/**
 * Pantry library card with swipe-to-delete.
 */
export default function FoodCard({ item, index = 0, onDelete }) {
  const translateX = useSharedValue(0);
  const urgencyColor = getUrgencyColor(item.urgency);

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-400);
        runOnJS(onDelete)(item.id);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const cardBg = 'bg-white/95';
  const textMain = 'text-primaryDark';
  const textSub = 'text-muted';

  return (
    <View className="mb-3 relative">
      <View className="absolute right-4 top-0 bottom-0 justify-center">
        <Ionicons name="trash-outline" size={24} color="#E76F51" />
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={cardStyle}>
          <Animated.View
            entering={FadeInDown.delay(index * 60).springify()}
            className={`${cardBg} rounded-2xl flex-row overflow-hidden shadow-sm border border-black/5`}
          >
            <View className="flex-1 p-3 justify-center">
              <Text className={`${textMain} font-bold text-base`} numberOfLines={1}>
                {item.productName}
              </Text>
              <Text className={`${textSub} text-sm mt-0.5`}>
                {item.category} · {formatExpirationDate(item.expirationDate)}
              </Text>
              <View className="flex-row items-center mt-2 gap-2">
                <View
                  className="px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: urgencyColor + '22' }}
                >
                  <Text style={{ color: urgencyColor }} className="text-xs font-semibold">
                    {item.daysLeft}d left · {URGENCY_LABELS[item.urgency]}
                  </Text>
                </View>
              </View>
            </View>
            <View
              className="w-1.5 self-stretch rounded-r-2xl"
              style={{ backgroundColor: urgencyColor }}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

/** Compact card for calendar day detail */
export function FoodCardCompact({ item }) {
  const urgencyColor = getUrgencyColor(item.urgency);
  const cardBg = 'bg-white/95';
  const textMain = 'text-primaryDark';

  return (
    <View className={`${cardBg} rounded-xl p-3 mb-2 border border-black/5`}>
      <Text className={`${textMain} font-semibold`} numberOfLines={1}>
        {item.productName}
      </Text>
      <Text style={{ color: urgencyColor }} className="text-sm font-medium mt-0.5">
        {URGENCY_LABELS[item.urgency]} · {item.daysLeft} days left
      </Text>
    </View>
  );
}
