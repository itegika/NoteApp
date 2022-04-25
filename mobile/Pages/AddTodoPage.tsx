import React from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import InputItem from '../Components/InputItem';
import CheckboxItem from '../Components/CheckboxItem';
import BtnItem from '../Components/BtnItem';
import { QUERY_KEYS, ROUTE_KEYS } from '../assets/constants';
import { TodoValidationSchema, resSchema } from '../assets/validation';
import todosService from '../services/todo.services';
import { Todo } from '../types/todo.types';
import { THEME } from '../assets/theme';

const AddTodoPage = () => {
  const { TODOS } = QUERY_KEYS;
  const { MAIN } = ROUTE_KEYS;
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);
  const [isPublic, setIsPublic] = React.useState<boolean>(false);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const initialValues = {
    title: '',
    description: '',
    year: '',
  };

  const { mutate: postTodo } = useMutation(
      async (data: Todo) => {
        return await todosService.addTodo(data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(TODOS);
        },
      },
  );

  const postTodoData = (data: Todo) => {
    try {
      postTodo(data);
      navigation.navigate(MAIN);
    } catch (err) {
      resSchema(err);
    }
  };
  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={TodoValidationSchema}
        onSubmit={(values, actions) => {
          postTodoData({ ...values, isPublic, isCompleted }),
          actions.setValues({ title: '', description: '', year: '' });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <InputItem
                name={'title'}
                value={values.title}
                error={errors.title}
                touched={touched.title}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <InputItem
                name={'description'}
                value={values.description}
                error={errors.description}
                touched={touched.description}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <InputItem
                name={'year'}
                value={values.year}
                error={errors.year}
                touched={touched.year}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <CheckboxItem
                title={'Public'}
                isPublic={isPublic}
                setIsPublic={setIsPublic}
              />
              <CheckboxItem
                title={'Completed'}
                isPublic={isCompleted}
                setIsPublic={setIsCompleted}
              />
              <BtnItem label="Add todo" onPress={handleSubmit}/>
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddTodoPage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: THEME.paddings.small,
  },
});
