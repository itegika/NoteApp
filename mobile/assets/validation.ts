import * as Yup from 'yup';

export const TodoValidationSchema = Yup.object().shape({
  title: Yup.string()
      .min(2, 'Shoul be more than 2 symbols!')
      .max(25, 'Should be less than 25 symbols!')
      .required('Required'),
  description: Yup.string()
      .min(2, 'Shoul be more than 2 symbols!')
      .max(500, 'Should be less than 500 symbols!')
      .required('Required'),
  year: Yup.number()
      .min(2022, 'Could not be early than 2022!')
      .max(2050, 'Should be up to 2050!')
      .required('Required'),
});

export const resSchema = (res: any) => {
  return JSON.stringify(res, undefined, 2);
};

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
      .email('Invalid email')
      .required('Required')
      .min(2, 'Should be more than 2 symbols!')
      .max(28, 'Should be less than 28 symbols!')
      .required('Required'),
  password: Yup.string().required('This field is required')
      .min(8, 'Should be at least 8 symbols!'),
  confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must be identic'),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
      .email('Invalid email')
      .required('Required')
      .min(2, 'Should be more than 2 symbols!')
      .max(28, 'Should be less than 28 symbols!')
      .required('Required'),
  password: Yup.string()
      .min(8, 'Should be at least 8 symbols!')
      .max(16, 'Should be less than 16 symbols!')
      .required('Required'),
});
