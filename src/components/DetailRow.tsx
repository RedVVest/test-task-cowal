import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../theme';

interface Props {
  label: string;
  value: React.ReactNode;
  last?: boolean;
}

export default function DetailRow({ label, value, last }: Props) {
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <Text style={[type.caption, styles.label]}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={[type.body, styles.value]}>{value}</Text>
      ) : (
        value
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    gap: 2,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    color: colors.muted,
  },
  value: {
    color: colors.text,
  },
});
