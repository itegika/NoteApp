import React from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ITodo } from '../types/todo.types';
import todosService from '../services/todo.services';
import { TodoValidationSchema, resSchema } from '../assets/validation';
import { QUERY_KEYS, ROUTE_KEYS } from '../assets/constants';
import InputItem from '../Components/InputItem';
import CheckboxItem from '../Components/CheckboxItem';
import BtnItem from '../Components/BtnItem';
import { THEME } from '../assets/theme';

const EditTodoPage = () => {
  const { TODOS } = QUERY_KEYS;
  const { MAIN } = ROUTE_KEYS;
  const navigation = useNavigation();
  const route: ITodo = useRoute().params;
  const queryClient = useQueryClient();
  const [isCompleted, setIsCompleted] = React.useState(route.isCompleted);
  const [isPublic, setIsPublic] = React.useState(route.isPublic);

  const initialValues = {
    title: route.title || '',
    description: route.description || '',
    year: route.year || '',
  };

  const { mutate: editTodo } = useMutation(
      async (data: ITodo) => {
        return await todosService.editTodo(route._id, data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(TODOS);
        },
      },
  );
  function editTodoData(data: ITodo) {
    try {
      editTodo(data);
      navigation.navigate(MAIN);
    } catch (err) {
      resSchema(err);
    }
  }
  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={TodoValidationSchema}
        onSubmit={(values, actions) => {
          editTodoData({ ...values, isCompleted, isPublic }),
          actions.setValues({ title: '', description: '', year: '' });
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <InputItem
                name={'title'}
                value={values.title}
                touched={touched.title}
                error={errors.title}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <InputItem
                name={'description'}
                value={values.description}
                touched={touched.description}
                error={errors.description}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <InputItem
                name={'year'}
                value={values.year}
                touched={touched.year}
                error={errors.year}
                handleBlur={handleBlur}
                handleChange={handleChange}
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
              <BtnItem label="Submit edits" onPress={handleSubmit} />
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditTodoPage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: THEME.paddings.small,
  },
});
