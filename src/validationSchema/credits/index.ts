import * as yup from 'yup';

export const creditValidationSchema = yup.object().shape({
  credit_info: yup.string().required(),
  bank_id: yup.string().nullable(),
});
