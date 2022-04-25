import React from 'react';
import { View, Alert, KeyboardAvoidingView,
  Platform, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { IUser } from '../types/user.types';
import authService from '../services/auth.services';
import { resSchema, loginValidationSchema } from '../assets/validation';
import { ROUTE_KEYS } from '../assets/constants';
import InputItem from '../Components/InputItem';
import BtnItem from '../Components/BtnItem';
import { THEME } from '../assets/theme';

const LoginPage = () => {
  const { MAIN } = ROUTE_KEYS;
  const navigation = useNavigation();

  const initialValues = {
    email: '',
    password: '',
  };

  const { mutateAsync } = useMutation(
      async (user: IUser) => {
        return await authService.login(user);
      },
      {
        onSuccess: () => {
          navigation.navigate(MAIN);
        },
        onError(err: Error) {
          resSchema(err);
          Alert.alert('Login Failed');
        },
      },
  );
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, actions ) => {
            await mutateAsync(values);
            actions.setValues({ email: '', password: '' });
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
            <View style={styles.formikContainer}>
              <InputItem
                name={'email'}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <InputItem
                name={'password'}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <BtnItem onPress={handleSubmit} label= 'Submit' />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: { marginTop: '25%' },
  formikContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: THEME.paddings.medium },
  registerMessage: {
    alignSelf: 'center',
    fontSize: THEME.fonts.min,
    fontWeight: 'bold',
  },
  errorMessage: {
    alignSelf: 'center',
    fontSize: THEME.fonts.min,
    fontWeight: 'bold',
    color: THEME.colors.red,
  },
});
