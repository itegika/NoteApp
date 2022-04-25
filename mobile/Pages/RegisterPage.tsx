import React from 'react';
import { View, Alert, Text, TouchableOpacity,
  KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import authService from '../services/auth.services';
import { IUser } from '../types/user.types';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_KEYS } from '../assets/constants';
import InputItem from '../Components/InputItem';
import BtnItem from '../Components/BtnItem';
import {
  registerValidationSchema, resSchema } from '../assets/validation';
import { THEME } from '../assets/theme';

const RegisterPage = () => {
  const { LOGIN } = ROUTE_KEYS;
  const navigation = useNavigation();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const { mutateAsync } = useMutation(
      async (user: IUser) => {
        return await authService.register(user);
      },
      {
        onSuccess: () => {
          navigation.navigate(LOGIN, {
          });
        },
        onError: (err) => {
          resSchema(err);
          Alert.alert('Registration failed');
        },
      },
  );
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={async (values, actions) => {
            const user = {
              email: values.email,
              password: values.password,
            };
            await mutateAsync(user);
            actions.setValues({
              email: '',
              password: '',
              confirmPassword: '',
            });
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
              <InputItem
                name={'confirmPassword'}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <BtnItem onPress={handleSubmit} label="Register" />
            </View>
          )}
        </Formik>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(LOGIN)}
            style={{
              marginTop: `${THEME.margins.mid}`,
              alignSelf: 'center',
            }}>
            <Text style={{ color: `${THEME.colors.grey}` }}>
             Already have an account?
              <Text style={{ fontSize: `${THEME.fonts.min}`,
                color: `${THEME.colors.green}`, fontWeight: 'bold',}}>
              Log In
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: { marginTop: '15%' },
  formikContainer: { display: 'flex',
    alignItems: 'center',
    padding: THEME.paddings.medium },
  input: {
    width: THEME.sizes.max,
    height: THEME.sizes.midIcon,
    margin: THEME.margins.mid,
    padding: THEME.paddings.small,
    borderWidth: 1,
    borderRadius: 5,
  },

});
