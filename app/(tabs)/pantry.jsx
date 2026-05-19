import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import PantryItemCard from '../../components/PantryItemCard';
import { colors, spacing } from '../../constants/theme';

const SAMPLE_ITEMS = [
  { id: '1', name: 'Whole Milk', quantity: '1 carton', expiresIn: 2 },
  { id: '2', name: 'Eggs', quantity: '12 count', expiresIn: 7 },
  { id: '3', name: 'Spinach', quantity: '1 bag', expiresIn: 3 },
  { id: '4', name: 'Chicken Breast', quantity: '2 lbs', expiresIn: 1 },
  { id: '5', name: 'Rice', quantity: '2 lbs', expiresIn: 90 },
];

export default function PantryScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScreenHeader
        title="Pantry Pal"
        subtitle="Track what's in your kitchen"
      />
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search pantry..."
          placeholderTextColor={colors.textSecondary}
        />
      </View>
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Expiring soon</Text>
        {SAMPLE_ITEMS.map((item) => (
          <PantryItemCard
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            expiresIn={item.expiresIn}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchWrap: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  search: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
