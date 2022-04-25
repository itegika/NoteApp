import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { ITodo } from '../types/todo.types';
import todosService from '../services/todo.services';
import TodoItem from '../Components/TodoItem';
import BtnItem from '../Components/BtnItem';
import { QUERY_KEYS, ROUTE_KEYS } from '../assets/constants';
import { THEME } from '../assets/theme';

const MainPage = () => {
  const navigation = useNavigation();
  const { ADD_TODO } = ROUTE_KEYS;
  const { TODOS } = QUERY_KEYS;
  const { isLoading, refetch, data: response } =
  useQuery(TODOS, () =>
    todosService.getAllTodos(),
  );

  const renderItem = ( { item }: { item: ITodo }) => (
    <TodoItem
      _id={ item._id }
      title={ item.title }
      description={ item.description }
      year={ item.year }
      isCompleted={ item.isCompleted }
      isPublic={ item.isPublic }
    />
  );
  useEffect( () => {
    refetch();
  }, [response?.data]);
  return (
    <View style={ styles.container }>
      <View>
        <BtnItem
          label ="Add todo"
          onPress={() => navigation.navigate(ADD_TODO)}
        />
      </View>
      {isLoading ? (
          <ActivityIndicator size = "large" color = { THEME.colors.green } />
      ) : (
        <FlatList
          data={ response?.data }
          renderItem={ renderItem }
          keyExtractor={(item) => item._id }
        />
      )}
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: THEME.margins.mid,
    padding: THEME.paddings.medium,
  },
});
