import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../constants/theme';

export default function PantryItemCard({ name, quantity, expiresIn }) {
  const isExpiringSoon = expiresIn <= 3;

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="nutrition-outline" size={24} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <View style={[styles.badge, isExpiringSoon && styles.badgeWarning]}>
        <Text style={[styles.badgeText, isExpiringSoon && styles.badgeTextWarning]}>
          {expiresIn}d
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.heading,
    fontSize: 16,
    color: colors.text,
  },
  quantity: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.primary,
  },
  badgeTextWarning: {
    color: '#B45309',
  },
});
