import * as Yup from 'yup';

export const createSchemaValidate = Yup.object().shape({
  salesperson_id: Yup.string().required(),
  directorate_id: Yup.string().required(),
  amount: Yup.string().required(),
  unit_id: Yup.string().required(),
  date_sale: Yup.date().required(),
});
