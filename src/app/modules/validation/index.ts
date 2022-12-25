import * as Yup from 'yup';

export const createSchemaValidate = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().min(6).required(),
});

export const authenticateSchemaValidate = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().min(6).required(),
});
