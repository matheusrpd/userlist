/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default function User({ route }) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [stars, setStars] = useState([]);
  const { user } = route.params;

  const loadStars = async numberPage => {
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: numberPage },
    });

    setStars(numberPage >= 2 ? [...stars, ...response.data] : response.data);
    setPage(numberPage);
    setRefreshing(false);
    setLoading(false);
  };

  const loadStarsMore = () => {
    const nextPage = page + 1;

    loadStars(nextPage);
  };

  const refreshList = () => {
    setRefreshing(true);
    setStars([]);
    loadStars(1);
  };

  useEffect(() => {
    loadStars(page);
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading && <Loading />}
      {!loading && (
        <Stars
          data={stars}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={loadStarsMore}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

User.propTypes = {
  route: PropTypes.shape().isRequired,
};
