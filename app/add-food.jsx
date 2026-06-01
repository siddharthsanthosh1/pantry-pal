import { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import { usePantry } from '../contexts/PantryContext';
import { getDaysLeft } from '../utils/urgency';

const CATEGORIES = ['Dairy', 'Produce', 'Meat', 'Bakery', 'Beverages', 'Frozen', 'Pantry'];

export default function AddFoodScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const { addItem } = usePantry();

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Produce');
  const [expirationDate, setExpirationDate] = useState('');
  const [saving, setSaving] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!productName.trim()) e.productName = 'Required';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(expirationDate)) e.expirationDate = 'Use YYYY-MM-DD';
    else if (Number.isNaN(new Date(expirationDate + 'T00:00:00').getTime()))
      e.expirationDate = 'Invalid date';
    return e;
  }, [productName, expirationDate]);

  const canSave = Object.keys(errors).length === 0 && !saving;
  const bg = isDark ? 'bg-darkBg' : 'bg-background';
  const card = isDark ? 'bg-darkCard' : 'bg-white';
  const textMain = isDark ? 'text-white' : 'text-primaryDark';
  const textSub = isDark ? 'text-gray-400' : 'text-muted';

  const onSave = async () => {
    if (!canSave) return;
    setSaving(true);
    const estimatedDaysLeft = getDaysLeft(expirationDate);

    await addItem({
      productName: productName.trim(),
      expirationDate,
      category,
      estimatedDaysLeft,
    });

    setSaving(false);
    router.replace('/(tabs)/library');
  };

  return (
    <View className={`flex-1 ${bg}`}>
      <Header
        title="Add Food"
        subtitle="Manual entry"
        rightAction={
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={22} color="#fff" />
          </Pressable>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 px-5 pt-5"
      >
        <View className={`${card} rounded-2xl p-4 border border-black/5`}>
          <Text className={`${textSub} text-xs uppercase tracking-wide mb-2`}>Food</Text>
          <TextInput
            value={productName}
            onChangeText={setProductName}
            placeholder="e.g. Strawberries"
            placeholderTextColor={isDark ? '#6B7280' : '#94A3B8'}
            className={`${textMain} text-base px-4 py-3 rounded-xl border border-black/5 ${
              isDark ? 'bg-darkSurface' : 'bg-white'
            }`}
          />
          {errors.productName ? (
            <Text className="text-danger mt-2 text-sm">{errors.productName}</Text>
          ) : null}

          <Text className={`${textSub} text-xs uppercase tracking-wide mb-2 mt-5`}>Category</Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <Pressable
                  key={c}
                  onPress={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full border ${
                    active
                      ? 'bg-primary border-primary'
                      : isDark
                        ? 'bg-darkSurface border-black/10'
                        : 'bg-white border-black/10'
                  }`}
                >
                  <Text className={`text-sm font-semibold ${active ? 'text-white' : textSub}`}>
                    {c}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text className={`${textSub} text-xs uppercase tracking-wide mb-2 mt-5`}>
            Expiration date
          </Text>
          <TextInput
            value={expirationDate}
            onChangeText={setExpirationDate}
            placeholder="YYYY-MM-DD"
            autoCapitalize="none"
            keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'default'}
            placeholderTextColor={isDark ? '#6B7280' : '#94A3B8'}
            className={`${textMain} text-base px-4 py-3 rounded-xl border border-black/5 ${
              isDark ? 'bg-darkSurface' : 'bg-white'
            }`}
          />
          {errors.expirationDate ? (
            <Text className="text-danger mt-2 text-sm">{errors.expirationDate}</Text>
          ) : null}
        </View>

        <Pressable
          onPress={onSave}
          disabled={!canSave}
          className={`mt-5 py-4 rounded-xl items-center ${
            canSave ? 'bg-primary' : isDark ? 'bg-darkCard' : 'bg-gray-200'
          }`}
        >
          <Text className={`font-bold text-lg ${canSave ? 'text-white' : textSub}`}>
            {saving ? 'Saving…' : 'Add to Pantry'}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
