import * as Yup from 'yup';

export const createSchemaValidate = Yup.object().shape({
  name: Yup.string().required(),
  user_id: Yup.string().required(),
});
