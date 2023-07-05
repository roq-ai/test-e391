import { BankInterface } from 'interfaces/bank';
import { GetQueryInterface } from 'interfaces';

export interface MortgageInterface {
  id?: string;
  mortgage_info: string;
  bank_id?: string;
  created_at?: any;
  updated_at?: any;

  bank?: BankInterface;
  _count?: {};
}

export interface MortgageGetQueryInterface extends GetQueryInterface {
  id?: string;
  mortgage_info?: string;
  bank_id?: string;
}
