import React from 'react';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Form, Input, SubmitButton } from './styles';

export default function Main({ navigation }) {
  function thisToUsers() {
    navigation.navigate('User');
  }

  return (
    <Container>
      <Form>
        <Input autoCorret={false} autoCapitalize="none" placeholder='Add user' />

        <SubmitButton>
          <Icon name="add" size={20} color="#fff" />
        </SubmitButton>
      </Form>

      <Button title="Navigate to Users" onPress={thisToUsers} />
    </Container>
  );
}
