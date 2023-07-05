import axios from 'axios';
import queryString from 'query-string';
import { CreditInterface, CreditGetQueryInterface } from 'interfaces/credit';
import { GetQueryInterface } from '../../interfaces';

export const getCredits = async (query?: CreditGetQueryInterface) => {
  const response = await axios.get(`/api/credits${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCredit = async (credit: CreditInterface) => {
  const response = await axios.post('/api/credits', credit);
  return response.data;
};

export const updateCreditById = async (id: string, credit: CreditInterface) => {
  const response = await axios.put(`/api/credits/${id}`, credit);
  return response.data;
};

export const getCreditById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/credits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCreditById = async (id: string) => {
  const response = await axios.delete(`/api/credits/${id}`);
  return response.data;
};
