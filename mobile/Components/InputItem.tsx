import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import { THEME } from '../assets/theme';

interface IProps {
  name: string;
  value: string;
  touched: boolean | undefined;
  error: string | undefined;
  handleBlur: Function;
  handleChange: Function;

}

const InputItem = (props: IProps) => {
  return (
    <React.Fragment>
      <Text style={styles.title}>{props.name}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onBlur={props.handleBlur(props.name)}
        onChange={props.handleChange(props.name)}
      />
      {props.error && props.touched ? <Text>{props.error}</Text> : undefined}
    </React.Fragment>
  );
};

export default InputItem;

const styles = StyleSheet.create({
  input: {
    width: THEME.sizes.max,
    height: THEME.sizes.smallHeight,
    margin: THEME.margins.small,
    padding: THEME.paddings.small,
    borderWidth: 1,
    borderColor: THEME.colors.grey,
    borderRadius: 5,
  },
  title: {
    fontSize: THEME.fonts.min,
    color: THEME.colors.grey,
    textTransform: 'uppercase',
    textAlign: 'center',

  },
});
