import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import nav from '../../src/static/images/nav.png';
import me from '../../src/static/images/logo.webp';

const Home = ({navigation}) => {
  const touchNav = () => {
    // navigation.openDrawer();
  };
  return (
    <View style={styles.app}>
      <View onTouchStart={touchNav} style={styles.nav}>
        <Image style={styles.nav_img} source={nav} />
      </View>
      <View style={styles.main}>
        <View style={styles.main_me}>
          <Image style={styles.me} source={me} />
        </View>
        <Text style={styles.name}>一只小白u</Text>
        <View style={styles.line} />
        <View style={styles.des}>
          <Text style={styles.des_text}>一只小白u</Text>
          <Text style={styles.des_text}>分享好博客，传递正能量!</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.welcome}>欢迎来到我的主页!</Text>
        <Text style={styles.copy}>
          Copyright &copy; 2022 一只小白u All Rights Reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#122B32',
    textAlign: 'center',
    lineHeight: 30,
    color: '#fff',
  },
  nav_img: {
    marginTop: -2,
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  main: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  main_me: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
    padding: 4,
    backgroundColor: '#fff',
    marginTop: 100,
  },
  me: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  name: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 100,
  },
  line: {
    width: 150,
    height: 0.5,
    backgroundColor: '#bbb',
  },
  des: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  des_text: {
    textAlign: 'center',
    color: '#bbb',
    lineHeight: 20,
  },
  welcome: {
    lineHeight: 60,
    color: '#bbb',
  },
  copy: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#ccc',
  },
});
export default Home;
