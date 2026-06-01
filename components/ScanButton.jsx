import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

/**
 * Floating action button — opens full-screen camera scan flow.
 */
export default function ScanButton() {
  const router = useRouter();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      true
    );
  }, [scale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={pulseStyle} className="absolute bottom-8 self-center z-50">
      <Pressable
        onPress={() => router.push('/scan')}
        className="flex-row items-center bg-white/95 px-8 py-4 rounded-full shadow-lg"
        style={{
          shadowColor: '#1B4332',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
        <View className="w-12 h-12 rounded-full bg-primary/15 items-center justify-center mr-3">
          <Ionicons name="camera" size={28} color="#2D6A4F" />
        </View>
        <Text className="text-primaryDark text-lg font-bold">Scan Label</Text>
      </Pressable>
    </Animated.View>
  );
}
