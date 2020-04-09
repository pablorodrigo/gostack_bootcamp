import React, { Component } from 'react';
import { Keyboard, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    console.tron.log(this.state.newUser);

    const { users, newUser } = this.state;

    const response = await api.get(`/users/${newUser}`);

    console.tron.log(response);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    console.tron.log(data);

    this.setState({
      users: [...users, data],
      newUser: '',
    });

    console.tron.log(users);

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

        <List
          data={users}
          // unique property in users
          keyExtractor={(user) => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>Check perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />

        {/* <Button title="Navigate to Users" onPress={thisToUsers} /> */}
      </Container>
    );
  }
}
