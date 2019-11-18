import React, {Component} from 'react';
import {View, AsyncStorage, FlatList, ActivityIndicator} from 'react-native';

import api from '../../services/api';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../components/Header';
import OrganizationItem from './OrganizationItem';

export default class Organizations extends Component {
  state = {
    data: [],
    loading: true,
    refreshingrefreshing: false,
  };

  async componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({refreshing: true});

    const username = await AsyncStorage.getItem('@Githuber:username');
    const {data} = await api.get(`/users/${username}/orgs`);

    this.setState({data, loading: false, refreshing: false});
  };

  renderListItem = ({item}) => <OrganizationItem organization={item} />;

  renderList = () => {
    const {data, refreshing} = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.container}>
        <Header title="Organizations" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

Organizations.navigationOptions = {
  tabBarIcon: ({tintColor}) => (
    <Icon name="building" size={20} color={tintColor} />
  ),
};
