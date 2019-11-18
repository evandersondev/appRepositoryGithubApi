import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import api from '../../services/api';

import Icon from 'react-native-vector-icons/FontAwesome';
import RepositoryItem from './RepositoryItem';

import Header from '../../components/Header';
import styles from './styles';

export default class Repositories extends Component {
  state = {
    data: [],
    loading: true,
    refreshingrefreshing: false,
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({refreshing: true});

    const username = await AsyncStorage.getItem('@Githuber:username');
    const {data} = await api.get(`/users/${username}/repos`);

    this.setState({data, loading: false, refreshing: false});
  };

  renderListItem = ({item}) => <RepositoryItem repository={item} />;

  renderList = () => {
    const {data, refreshing} = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.container}>
        <Header title="Repository" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

Repositories.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="list-alt" size={20} color={tintColor} />
  ),
};
