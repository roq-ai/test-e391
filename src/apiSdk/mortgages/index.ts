import axios from 'axios';
import queryString from 'query-string';
import { MortgageInterface, MortgageGetQueryInterface } from 'interfaces/mortgage';
import { GetQueryInterface } from '../../interfaces';

export const getMortgages = async (query?: MortgageGetQueryInterface) => {
  const response = await axios.get(`/api/mortgages${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMortgage = async (mortgage: MortgageInterface) => {
  const response = await axios.post('/api/mortgages', mortgage);
  return response.data;
};

export const updateMortgageById = async (id: string, mortgage: MortgageInterface) => {
  const response = await axios.put(`/api/mortgages/${id}`, mortgage);
  return response.data;
};

export const getMortgageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mortgages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMortgageById = async (id: string) => {
  const response = await axios.delete(`/api/mortgages/${id}`);
  return response.data;
};
