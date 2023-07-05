import { CreditInterface } from 'interfaces/credit';
import { MortgageInterface } from 'interfaces/mortgage';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BankInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  credit?: CreditInterface[];
  mortgage?: MortgageInterface[];
  user?: UserInterface;
  _count?: {
    credit?: number;
    mortgage?: number;
  };
}

export interface BankGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
