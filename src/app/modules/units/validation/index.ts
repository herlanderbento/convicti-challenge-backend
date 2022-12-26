import * as Yup from 'yup';

export const createSchemaValidate = Yup.object().shape({
  directorate_id: Yup.string().required(),
  name: Yup.string().required(),
  latitude: Yup.string().required(),
  longitude: Yup.string().required(),
});
