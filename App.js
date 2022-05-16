import 'react-native-gesture-handler';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Blog from './src/pages/Blog';
import Contact from './src/pages/Contact';
import MsgBorad from './src/pages/MsgBorad';
import Home from './src/pages/Home';
import BlogDetail from './src/pages/BlogDetail';

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="我的博客"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#122B32',
          },
          headerTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#122B32',
          },
          drawerInactiveTintColor: '#fff',
          // headerShown: false,
        }}>
        <Drawer.Screen name="首页" component={Home} />
        <Drawer.Screen name="我的博客" component={Blog} />
        <Drawer.Screen name="联系我" component={Contact} />
        <Drawer.Screen name="留言板" component={MsgBorad} />
        <Drawer.Screen
          name="博客详情"
          component={BlogDetail}
          options={{
            drawerLabel: () => null,
            drawerActiveBackgroundColor: '#122B32',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
