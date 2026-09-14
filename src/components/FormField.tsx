import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface Props extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
}

export default function FormField({ label, error, ...inputProps }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[type.caption, styles.label]}>{label}</Text>
      <TextInput
        style={[styles.input, !!error && styles.inputError]}
        placeholderTextColor={colors.muted}
        accessibilityLabel={label}
        {...inputProps}
      />
      {!!error && <Text style={[type.caption, styles.error]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs + 2,
  },
  label: {
    color: colors.muted,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    fontSize: 17,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
  },
});
