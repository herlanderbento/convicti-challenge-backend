import * as Yup from 'yup';

export const directorateInputSchemaValidate = Yup.object().shape({
  name: Yup.string().required(),
  directorate_name: Yup.string().required(),
  roles: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});
