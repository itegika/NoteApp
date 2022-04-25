import React from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

const CheckboxItem = (props: {
  title: string,
  isPublic: boolean,
  setIsPublic: Function,
}) => {
  return (
    <View>
      <CheckBox
        title={props.title}
        checked={props.isPublic}
        onPress={() => props.setIsPublic(!props.isPublic)}
      />
    </View>
  );
};

export default CheckboxItem;
