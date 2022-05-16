import React, {useEffect} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
// import request from '../http';

const BlogDetail = ({route}) => {
  const {blogpath} = route.params;
  // useEffect(() => {
  //   request
  //     .get({
  //       url: '/blog/getblog',
  //       data: {
  //         blogpath,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data.data);
  //     });
  // }, []);
  return (
    <View>
      <WebView source={{uri: `http://192.168.0.106:3300${blogpath}`}} />
    </View>
  );
};
export default BlogDetail;
