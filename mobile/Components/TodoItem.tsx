import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ITodo } from '../types/todo.types';
import todosService from '../services/todo.services';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { QUERY_KEYS, ROUTE_KEYS } from '../assets/constants';
import IconItem from './IconItem';
import { THEME } from '../assets/theme';

const TodoItem: React.FC<ITodo> = ({
  _id,
  title,
  description,
  year,
  isCompleted,
  isPublic,
}) => {
  const { TODOS } = QUERY_KEYS;
  const { EDIT_TODO } = ROUTE_KEYS;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { mutate: deleteTodo } = useMutation(
      () => todosService.deleteTodo(_id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(TODOS);
        },
      },
  );

  const goToEdit = () => {
    navigation.navigate(EDIT_TODO, {
      _id,
      title,
      description,
      year,
      isCompleted,
      isPublic,
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.year}>/ {year}</Text>
        </View>
        <Text style={styles.text}>{description}</Text>
        <View style={styles.status}>
          <Text
            style={{
              color: isCompleted ? 'green' : 'grey',
            }}
          >
            {isCompleted ? 'Completed' : 'Incompleted'}
          </Text>
          <Text
            style={{
              color: isPublic ? 'green' : 'red',
              marginLeft: 10,
            }}
          >
            {isPublic ? 'Public' : 'Private'}
          </Text>
        </View>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => goToEdit()}>
          <IconItem name="edit" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTodo()}>
          <IconItem name="delete" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: THEME.colors.white,
    borderRadius: 8,
    shadowColor: THEME.colors.grey,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
    marginLeft: THEME.margins.mid,
    marginRight: THEME.margins.mid,
    marginBottom: THEME.margins.large,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.7,
    paddingLeft: THEME.paddings.medium,
    margin: THEME.margins.mid,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 0.3,
    marginRight: THEME.margins.mid,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: THEME.fonts.reg,
    fontWeight: 'bold',
    color: THEME.colors.grey,
    padding: THEME.paddings.small,
  },
  year: {
    alignSelf: 'center',
    fontSize: THEME.fonts.reg,
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: THEME.fonts.min,
  },
  isPrivate: { marginLeft: THEME.margins.mid },
  status: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 5,
    flex: 1,
  },
});
