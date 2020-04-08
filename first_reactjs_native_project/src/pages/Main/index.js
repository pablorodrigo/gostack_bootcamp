import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    console.tron.log(this.state.newUser);

    const { users, newUser } = this.state;

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
    });

    Keyboard.dismiss();
  };

  /* function thisToUsers() {
    navigation.navigate('User');
  } */
  render() {
    const { users, newUser } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorret={false}
            autoCapitalize="none"
            placeholder="Add user"
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />

          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>

        {/* <Button title="Navigate to Users" onPress={thisToUsers} /> */}
      </Container>
    );
  }
}
