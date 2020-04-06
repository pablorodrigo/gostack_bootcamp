import React from 'react';
import { Text, View, Button } from 'react-native';

import {Container} from './styles';

export default function Main({ navigation }) {
  function thisToUsers() {
    navigation.navigate('User');
  }

  return (
    <Container>
      <Text>Main</Text>
      <Button title="Navigate to Users" onPress={thisToUsers} />
    </Container>
  );
}
