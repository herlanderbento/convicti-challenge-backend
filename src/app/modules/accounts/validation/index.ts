import * as Yup from 'yup';

export const usersInputSchemaValidate = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});
