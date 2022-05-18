import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native';
import request from '../http';
import {ADD_MSGBOARD, FIND_SHOW_MSGBOARD} from '../http/api';

const Item = ({item}) => {
  return <Text style={styles.msg}>{item.msgboard}</Text>;
};

const MsgBoard = () => {
  const [allMsg, setAllMsg] = useState([]);
  const [value, setValue] = useState('');
  const [current, setCurrent] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const changeValue = text => {
    setValue(text);
  };
  const refresh = () => {
    setRefreshing(true);
    if (current === 1) {
      setRefreshing(false);
    } else {
      setCurrent(1);
    }
  };
  const scrolltoEnd = () => {
    setRefreshing(true);
    setCurrent(cur => ++cur);
    // setCurrent(1);
  };
  const getMsg = cur => {
    request
      .get({
        url: FIND_SHOW_MSGBOARD,
        data: {
          current: cur,
        },
      })
      .then(res => {
        console.log(res.data.data);
        if (current === 1) {
          // console.log(res.data.data);
          setAllMsg(res.data.data);
        } else {
          if (res.data.data.length !== 0) {
            setAllMsg(msg => [...msg, ...res.data.data]);
          }
        }
        setRefreshing(false);
      });
  };
  const submit = () => {
    if (value !== '') {
      request
        .post({
          url: ADD_MSGBOARD,
          data: {
            msgboard: value,
          },
        })
        .then(res => {
          if (res.data.code === 200) {
            setValue('');
          }
        });
    }
  };
  useEffect(() => {
    getMsg(current);
  }, [current]);
  return (
    <View style={styles.msgborad}>
      <View style={styles.main}>
        <FlatList
          data={allMsg}
          keyExtractor={item => item.id}
          renderItem={Item}
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReachedThreshold={0.05}
          onEndReached={scrolltoEnd}
          ListEmptyComponent={() => (
            <Text>暂时还没有留言，留个言鼓励下ta吧！！！</Text>
          )}
        />
      </View>
      <TextInput
        value={value}
        onChangeText={changeValue}
        onSubmitEditing={submit}
        style={styles.input}
        placeholder="添加一条留言，鼓励下ta吧！！！回车键添加留言"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  msgborad: {
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
  },
  input: {
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  msg: {
    backgroundColor: '#fff',
    lineHeight: 30,
    fontSize: 18,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
export default MsgBoard;
