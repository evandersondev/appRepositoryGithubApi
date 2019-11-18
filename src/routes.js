import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Wellcome from './pages/Wellcome';
import Repositories from './pages/Repositories';
import Organizations from './pages/Organizations';

import colors from './styles/colors';

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Wellcome,
        User: createBottomTabNavigator(
          {
            Repositories,
            Organizations,
          },
          {
            tabBarOptions: {
              showIcon: true,
              showLabel: false,
              activeTintColor: colors.white,
              inactiveTintColor: colors.whiteTransparent,
              style: {
                backgroundColor: colors.secundary,
              },
            },
          },
        ),
      },
      {
        initialRouteName: userLogged ? 'User' : 'Wellcome',
      },
    ),
  );

export default Routes;
