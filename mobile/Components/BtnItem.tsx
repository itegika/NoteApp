import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME } from '../assets/theme';

type IButton = {
  label: string;
  onPress: () => void;
};

const BtnItem = ({ label, onPress }: IButton) => {
  return (
    <TouchableOpacity style={ styles.button } onPress={ onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: THEME.sizes.half,
    backgroundColor: THEME.colors.green,
    padding: THEME.paddings.medium,
    margin: THEME.margins.large,
    borderRadius: 15,
  },
  text: {
    fontSize: THEME.fonts.min,
    lineHeight: 22,
    textTransform: 'uppercase',
    color: THEME.colors.white,
    letterSpacing: 1.0,
  },
});

export default BtnItem;
