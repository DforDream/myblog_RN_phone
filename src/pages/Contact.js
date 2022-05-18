import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Config from '../config/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contact = ref => {
  const setStorage = async (key, value) => {
    return new Promise(async (resolve, reject) => {
      if (await AsyncStorage.getItem(key)) {
        resolve(await AsyncStorage.getItem(key));
      } else {
        await AsyncStorage.setItem(key, value);
        resolve(await AsyncStorage.getItem(key));
      }
    });
  };
  const [userId, setUserId] = useState('');
  const [dataArr, setDataArr] = useState([]);
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [socket, setSocket] = useState({});
  const scroll = useRef(null);
  const time = () => {
    const date = new Date();
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${
      date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
    }:${date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`}`;
  };
  const submit = () => {
    setTitle(value);
    setValue('');
  };
  const changeValue = text => {
    setValue(text);
  };
  const sizeChange = () => {
    scroll.current.scrollToEnd();
  };

  useEffect(() => {
    setStorage('@userId', JSON.stringify(new Date().getTime())).then(res => {
      setUserId(res);
      const _socket = new WebSocket(`${Config.API_BASE_WS}/${userId}`);
      _socket.onopen;
      _socket.onmessage = msg => {
        const data = JSON.parse(msg.data);
        setDataArr(data.data[0].data);
      };
      setSocket(_socket);
    });
  }, []);
  useEffect(() => {
    if (title !== '') {
      setDataArr(data => {
        return [
          ...data,
          {
            id: userId,
            title,
            isAdmin: false,
            time: time(),
            isLoading: true,
          },
        ];
      });
      scroll.current.scrollToEnd();
      socket.send(
        JSON.stringify({
          id: userId,
          title,
          isAdmin: false,
          time: time(),
          isLoading: false,
        }),
      );
      setTitle('');
    }
  }, [title]);
  const Data = () => {
    return dataArr.map(item => (
      <View
        style={[item.isAdmin ? '' : styles.right, styles.data]}
        key={item.time}>
        <Text style={styles.time}>{item.time}</Text>
        <View style={styles.content}>
          <ActivityIndicator
            style={item.isLoading ? '' : styles.hide}
            animating={item.isLoading}
          />
          <Text
            style={[
              styles.title,
              item.isAdmin ? styles.admin : styles.notAdmin,
            ]}>
            {item.title}
          </Text>
        </View>
      </View>
    ));
  };
  return (
    <View style={styles.contact}>
      <ScrollView
        ref={scroll}
        style={styles.main}
        onContentSizeChange={sizeChange}>
        <Data />
      </ScrollView>
      <TextInput
        value={value}
        style={styles.text_input}
        onSubmitEditing={submit}
        onChangeText={changeValue}
        onFocus={sizeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text_input: {
    backgroundColor: '#fff',
  },
  data: {
    display: 'flex',
    paddingBottom: 5,
  },
  right: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    paddingBottom: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  hide: {
    display: 'none',
  },
  title: {
    // flex: 1,
    fontSize: 14,
    lineHeight: 30,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  admin: {
    backgroundColor: '#53868a50',
  },
  notAdmin: {
    backgroundColor: '#ff725650',
  },
});
export default Contact;
