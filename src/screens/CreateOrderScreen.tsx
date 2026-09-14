import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { RootStackScreenProps } from '../navigation/RootNavigator';
import { useOrders } from '../context/OrdersContext';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';
import { WINDOW_TYPE_OPTIONS } from '../utils/windowType';
import { OrderFormErrors, OrderFormValues, validateOrderForm } from '../utils/validation';
import { colors, radius, spacing } from '../theme';

const INITIAL_VALUES: OrderFormValues = {
  customerName: '',
  address: '',
  windowType: 'turn',
  width: '',
  height: '',
};

export default function CreateOrderScreen({ navigation }: RootStackScreenProps<'CreateOrder'>) {
  const { addOrder } = useOrders();
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 96 : 0}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <FormField
          label="Имя клиента"
          value={values.customerName}
          onChangeText={(text) => setField('customerName', text)}
          placeholder="Иван Петров"
          error={errors.customerName}
        />
        <FormField
          label="Адрес"
          value={values.address}
          onChangeText={(text) => setField('address', text)}
          placeholder="ул. Ленина, 12, кв. 5"
          error={errors.address}
        />
        <SelectField
          label="Тип окна"
          value={values.windowType}
          options={WINDOW_TYPE_OPTIONS}
          onChange={(value) => setField('windowType', value)}
        />
        <FormField
          label="Ширина, мм"
          value={values.width}
          onChangeText={(text) => setField('width', text)}
          placeholder="1200"
          keyboardType="numeric"
          error={errors.width}
        />
        <FormField
          label="Высота, мм"
          value={values.height}
          onChangeText={(text) => setField('height', text)}
          placeholder="1400"
          keyboardType="numeric"
          error={errors.height}
        />

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Сохранить</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  button: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
