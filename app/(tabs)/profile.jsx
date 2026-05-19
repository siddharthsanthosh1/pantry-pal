import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import { colors, spacing, typography } from '../../constants/theme';

const MENU_ITEMS = [
  { icon: 'notifications-outline', label: 'Expiry reminders', value: 'On' },
  { icon: 'calendar-outline', label: 'Weekly meal plan', value: 'Off' },
  { icon: 'people-outline', label: 'Household members', value: '1' },
  { icon: 'settings-outline', label: 'Settings', value: '' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScreenHeader title="Profile" subtitle="Manage your Pantry Pal" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={colors.primary} />
          </View>
          <Text style={styles.name}>Pantry Pal User</Text>
          <Text style={styles.stats}>5 items · 2 expiring soon</Text>
        </View>
        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <Pressable key={item.label} style={styles.menuRow}>
              <Ionicons name={item.icon} size={22} color={colors.primary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.value ? (
                <Text style={styles.menuValue}>{item.value}</Text>
              ) : (
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              )}
            </Pressable>
          ))}
        </View>
        <Text style={styles.version}>Pantry Pal v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  stats: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  menuLabel: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  menuValue: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  version: {
    textAlign: 'center',
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xl,
  },
});
