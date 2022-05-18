import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Markdown from 'react-native-markdown-display';
import request from '../http';
import {GET_BLOG} from '../http/api';

const BlogDetail = ({route}) => {
  const {blogpath} = route.params;
  const [detail, setDetail] = useState('');
  useEffect(() => {
    request
      .get({
        url: GET_BLOG,
        data: {
          blogpath,
        },
      })
      .then(res => {
        setDetail(res.data.data);
      });
  }, []);
  return (
    <View>
      <ScrollView contentContainerStyle={styles.detail}>
        <Markdown>{detail}</Markdown>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
});

export default BlogDetail;
