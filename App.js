import 'react-native-gesture-handler';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Blog from './src/pages/Blog';
import Contact from './src/pages/Contact';
import MsgBorad from './src/pages/MsgBorad';
import Home from './src/pages/Home';
import BlogDetail from './src/pages/BlogDetail';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const DrawerWrap = () => {
  return (
    <Drawer.Navigator
      initialRouteName="首页"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#122B32',
        },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#122B32',
        },
        drawerInactiveTintColor: '#fff',
        headerShown: false,
      }}>
      <Drawer.Screen name="首页" component={Home} />
      <Drawer.Screen name="我的博客" component={Blog} />
      <Drawer.Screen name="联系我" component={Contact} />
      <Drawer.Screen name="留言板" component={MsgBorad} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="wrap">
        <Stack.Screen
          name="wrap"
          component={DrawerWrap}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="blogdetail"
          component={BlogDetail}
          options={({route}) => ({
            headerTitle: route.params.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
