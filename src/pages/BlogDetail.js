import React from 'react';
import {Text, View} from 'react-native';

const BlogDetail = ({route, navigation}) => {
  const {blogpath} = route;
  const back = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text onTouchEndCapture={back}>返回</Text>
    </View>
  );
};
export default BlogDetail;
