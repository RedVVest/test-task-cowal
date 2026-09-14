import React from 'react';
import { Text, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/RootNavigator';

export default function HomeScreen(_props: RootStackScreenProps<'Home'>) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
