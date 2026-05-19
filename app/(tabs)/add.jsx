import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import { colors, spacing, typography } from '../../constants/theme';

export default function AddScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScreenHeader title="Add to Pantry" subtitle="Log a new item" />
      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Item name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Greek yogurt"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 1 container"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Expires in (days)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 7"
            placeholderTextColor={colors.textSecondary}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.chipRow}>
            {['Dairy', 'Produce', 'Meat', 'Pantry', 'Other'].map((cat) => (
              <Pressable key={cat} style={styles.chip}>
                <Text style={styles.chipText}>{cat}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    color: colors.text,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    color: colors.primary,
    fontWeight: '500',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
