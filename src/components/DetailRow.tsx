import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

interface Props {
  label: string;
  value: React.ReactNode;
}

export default function DetailRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {typeof value === 'string' ? <Text style={styles.value}>{value}</Text> : value}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.xs,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
});
