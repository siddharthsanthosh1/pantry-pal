import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import { colors, spacing, typography } from '../../constants/theme';

const SAMPLE_RECIPES = [
  {
    id: '1',
    title: 'Spinach Omelette',
    match: 'Uses 2 pantry items',
    time: '15 min',
  },
  {
    id: '2',
    title: 'Chicken & Rice Bowl',
    match: 'Uses 3 pantry items',
    time: '35 min',
  },
  {
    id: '3',
    title: 'Berry Smoothie',
    match: 'Uses 1 pantry item',
    time: '5 min',
  },
];

export default function RecipesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScreenHeader
        title="Recipe Ideas"
        subtitle="Based on what you have"
      />
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {SAMPLE_RECIPES.map((recipe) => (
          <Pressable key={recipe.id} style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="restaurant" size={28} color={colors.primary} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{recipe.title}</Text>
              <Text style={styles.cardMatch}>{recipe.match}</Text>
            </View>
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.timeText}>{recipe.time}</Text>
            </View>
          </Pressable>
        ))}
        <View style={styles.hint}>
          <Ionicons name="bulb-outline" size={20} color={colors.primary} />
          <Text style={styles.hintText}>
            Add more items to your pantry for better recipe suggestions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    ...typography.heading,
    fontSize: 17,
    color: colors.text,
  },
  cardMatch: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  hintText: {
    flex: 1,
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
