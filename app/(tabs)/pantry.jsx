import { View, ScrollView, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import Header from '../../components/Header';
import ScanButton from '../../components/ScanButton';
import { FoodCardCompact } from '../../components/FoodCard';
import EmptyState from '../../components/EmptyState';
import { usePantry } from '../../contexts/PantryContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function PantryScreen() {
  const router = useRouter();
  const { items } = usePantry();
  const { isDark } = useTheme();
  const bg = isDark ? 'bg-darkBg' : 'bg-background';
  const recent = items.slice(0, 3);

  return (
    <View className={`flex-1 ${bg}`}>
      <Header
        title="PantryPal"
        subtitle="Scan labels · Save food · Waste less"
        showSignOut
      />

      <ScrollView
        className="flex-1 px-5 pt-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => router.push('/scan')}
          className={`rounded-3xl overflow-hidden mb-6 border-2 border-dashed ${
            isDark ? 'border-primaryLight/40 bg-darkCard' : 'border-primary/30 bg-accent/40'
          }`}
        >
          <View className="items-center py-10">
            <View className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-4">
              <Ionicons name="camera" size={40} color="#fff" />
            </View>
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-primaryDark'}`}>
              Scan a food label
            </Text>
            <Text className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-muted'}`}>
              Point at expiration date & product name
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.push('/add-food')}
          className={`rounded-2xl px-4 py-4 mb-6 flex-row items-center justify-between border border-black/5 ${
            isDark ? 'bg-darkCard' : 'bg-white'
          }`}
        >
          <View className="flex-row items-center">
            <View className="w-11 h-11 rounded-full bg-primary/15 items-center justify-center mr-3">
              <Ionicons name="add" size={24} color={isDark ? '#A7F3D0' : '#2D6A4F'} />
            </View>
            <View>
              <Text className={`${isDark ? 'text-white' : 'text-primaryDark'} font-bold text-base`}>
                Add food manually
              </Text>
              <Text className={`${isDark ? 'text-gray-400' : 'text-muted'} text-sm mt-0.5`}>
                Quick add without scanning
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={isDark ? '#9CA3AF' : '#94A3B8'} />
        </Pressable>

        <View className="flex-row items-center justify-between mb-3">
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-primaryDark'}`}>
            Recent scans
          </Text>
          {items.length > 0 && (
            <Pressable onPress={() => router.push('/(tabs)/library')}>
              <Text className="text-primaryLight font-semibold">See all</Text>
            </Pressable>
          )}
        </View>

        {recent.length === 0 ? (
          <EmptyState
            message="No foods scanned yet."
            hint="Tap Scan Label below or add a food manually."
          />
        ) : (
          recent.map((item, i) => (
            <Animated.View key={item.id} entering={FadeIn.delay(i * 100)}>
              <FoodCardCompact item={item} />
            </Animated.View>
          ))
        )}
      </ScrollView>

      <ScanButton />
    </View>
  );
}
