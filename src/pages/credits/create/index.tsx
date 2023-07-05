import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCredit } from 'apiSdk/credits';
import { Error } from 'components/error';
import { creditValidationSchema } from 'validationSchema/credits';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BankInterface } from 'interfaces/bank';
import { getBanks } from 'apiSdk/banks';
import { CreditInterface } from 'interfaces/credit';

function CreditCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CreditInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCredit(values);
      resetForm();
      router.push('/credits');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CreditInterface>({
    initialValues: {
      credit_info: '',
      bank_id: (router.query.bank_id as string) ?? null,
    },
    validationSchema: creditValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Credit
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="credit_info" mb="4" isInvalid={!!formik.errors?.credit_info}>
            <FormLabel>Credit Info</FormLabel>
            <Input type="text" name="credit_info" value={formik.values?.credit_info} onChange={formik.handleChange} />
            {formik.errors.credit_info && <FormErrorMessage>{formik.errors?.credit_info}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<BankInterface>
            formik={formik}
            name={'bank_id'}
            label={'Select Bank'}
            placeholder={'Select Bank'}
            fetcher={getBanks}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'credit',
    operation: AccessOperationEnum.CREATE,
  }),
)(CreditCreatePage);
