import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Image, StyleSheet, FlatList} from 'react-native';
import {FIND_BLOG} from '../http/api';
import logo from '../static/images/logo.webp';
import request from '../http';

const Blog = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [current, setCurrent] = useState(1);
  const [blog, setBlog] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const changeSearch = text => {
    setSearch(text);
  };
  const searchBlog = () => {
    setTitle(search);
    setCurrent(1);
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
    setCurrent(value => ++value);
  };
  const toDetail = (blogpath, name) => () => {
    navigation.navigate('blogdetail', {
      blogpath,
      name,
    });
  };
  useEffect(() => {
    request
      .get({
        url: FIND_BLOG,
        data: {
          title,
          current,
        },
      })
      .then(res => {
        if (current === 1) {
          setBlog(res.data.data);
        } else {
          if (res.data.data.length !== 0) {
            setBlog(value => {
              res.data.data.forEach(element => {
                value.push(element);
              });
              return value;
            });
          }
        }
        setRefreshing(false);
      });
  }, [current, title]);

  const BlogList = ({item}) => {
    return (
      <View
        style={styles.blog_list}
        key={item.id}
        onTouchEndCapture={toDetail(item.blogpath, item.title)}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.user}>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.name}>一只小白u</Text>
          <Text style={styles.time}>{item.createdate}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.blog}>
      <TextInput
        value={search}
        onChangeText={changeSearch}
        onSubmitEditing={searchBlog}
        placeholder="请输入想搜索的博客"
        style={styles.input}
      />
      <FlatList
        style={styles.flat_list}
        data={blog}
        renderItem={BlogList}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReachedThreshold={0.05}
        onEndReached={scrolltoEnd}
        ListEmptyComponent={() => <Text>暂时还没有博客。。。</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blog: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  flat_list: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  blog_list: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 20,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
  },
  logo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 20,
  },
  name: {
    fontSize: 12,
    color: '#333',
    marginRight: 20,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: '#333',
    lineHeight: 20,
  },
});
export default Blog;
