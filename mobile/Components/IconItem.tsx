import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { THEME } from '../assets/theme';

const IconItem = ({ name }: { name: string }) => {
  return (
    <React.Fragment>
      <View style={styles.icon}>
        <Icon name={name} color={THEME.colors.grey}
          size={THEME.sizes.largeIcon} tvParallaxProperties={undefined} />
        <Text style={styles.title}>{name.toLocaleUpperCase()}</Text>
      </View>
    </React.Fragment>
  );
};

export default IconItem;

const styles = StyleSheet.create({
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: THEME.sizes.smallHeight,
    borderRadius: 8,
    margin: THEME.margins.small + 2,
  },
  title: {
    color: THEME.colors.grey,
    fontSize: THEME.fonts.min - 4,
  },
});
