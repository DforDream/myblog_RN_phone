import 'react-native-gesture-handler';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Blog from './src/pages/Blog';
import Contact from './src/pages/Contact';
import MsgBorad from './src/pages/MsgBorad';
import Home from './src/pages/Home';

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="home">
        <Drawer.Screen name="home" component={Home} />
        <Drawer.Screen name="blog" component={Blog} />
        <Drawer.Screen name="contact" component={Contact} />
        <Drawer.Screen name="msgborad" component={MsgBorad} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
