import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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

export default function Main() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const usersStorage = await AsyncStorage.getItem('users');

      if (usersStorage) {
        setUsers(JSON.parse(usersStorage));
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const saveUsers = () => {
      AsyncStorage.setItem('users', JSON.stringify(users));
    };

    saveUsers();
  }, [users]);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await api.get(`/users/${newUser}`);

    const user = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsers([...users, user]);
    setNewUser('');

    Keyboard.dismiss();
    setLoading(false);
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton onPress={handleSubmit} loading={loading}>
          {loading && <ActivityIndicator color="#FFF" />}
          {!loading && <Icon name="add" size={20} color="#FFF" />}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}
