import * as Yup from 'yup';

export const directorateInputSchemaValidate = Yup.object().shape({
  name: Yup.string().required(),
  directorate_name: Yup.string().required(),
  user_id: Yup.string().required(),
  roles: Yup.string().required(),
});
