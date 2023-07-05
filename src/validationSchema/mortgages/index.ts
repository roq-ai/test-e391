import * as yup from 'yup';

export const mortgageValidationSchema = yup.object().shape({
  mortgage_info: yup.string().required(),
  bank_id: yup.string().nullable(),
});
