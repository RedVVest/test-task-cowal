import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { useOrders } from '../context/OrdersContext';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import PrimaryButton from '../components/PrimaryButton';
import { WINDOW_TYPE_OPTIONS } from '../utils/windowType';
import { OrderFormErrors, OrderFormValues, validateOrderForm } from '../utils/validation';
import { colors, spacing } from '../theme';

const INITIAL_VALUES: OrderFormValues = {
  customerName: '',
  address: '',
  windowType: 'turn',
  width: '',
  height: '',
};

export default function CreateOrderScreen({ navigation }: RootStackScreenProps<'CreateOrder'>) {
  const { addOrder } = useOrders();
  const headerHeight = useHeaderHeight();
  const [values, setValues] = useState<OrderFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<OrderFormErrors>({});

  const setField = <K extends keyof OrderFormValues>(key: K, value: OrderFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const handleSave = () => {
    const result = validateOrderForm(values);
    if (!result.parsed) {
      setErrors(result.errors);
      return;
    }
    addOrder({
      customerName: values.customerName.trim(),
      address: values.address.trim(),
      windowType: values.windowType,
      width: result.parsed.width,
      height: result.parsed.height,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <FormField
          label="Имя клиента"
          value={values.customerName}
          onChangeText={(text) => setField('customerName', text)}
          placeholder="Иван Петров"
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.customerName}
        />
        <FormField
          label="Адрес"
          value={values.address}
          onChangeText={(text) => setField('address', text)}
          placeholder="ул. Ленина, 12, кв. 5"
          returnKeyType="next"
          error={errors.address}
        />
        <SelectField
          label="Тип окна"
          value={values.windowType}
          options={WINDOW_TYPE_OPTIONS}
          onChange={(value) => setField('windowType', value)}
        />
        <View style={styles.sizes}>
          <View style={styles.flex}>
            <FormField
              label="Ширина, мм"
              value={values.width}
              onChangeText={(text) => setField('width', text)}
              placeholder="1200"
              keyboardType="decimal-pad"
              error={errors.width}
            />
          </View>
          <View style={styles.flex}>
            <FormField
              label="Высота, мм"
              value={values.height}
              onChangeText={(text) => setField('height', text)}
              placeholder="1400"
              keyboardType="decimal-pad"
              error={errors.height}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <PrimaryButton title="Сохранить" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  sizes: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  footer: {
    marginTop: spacing.sm,
  },
});
