import { BankInterface } from 'interfaces/bank';
import { GetQueryInterface } from 'interfaces';

export interface CreditInterface {
  id?: string;
  credit_info: string;
  bank_id?: string;
  created_at?: any;
  updated_at?: any;

  bank?: BankInterface;
  _count?: {};
}

export interface CreditGetQueryInterface extends GetQueryInterface {
  id?: string;
  credit_info?: string;
  bank_id?: string;
}
