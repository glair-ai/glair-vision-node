import { OCRRead } from './base';

type BANK_STATEMENT_FIELDS = 'bank_name' | 'start_period' | 'end_period';

type ACCOUNT_FIELDS =
  | 'account_number'
  | 'account_name'
  | 'beginning_balance'
  | 'total_debit_transaction'
  | 'total_credit_transaction'
  | 'currency'
  | 'product_name'
  | 'total_transactions';

type TRANSACTION_FIELDS =
  | 'posting_date'
  | 'posting_time'
  | 'effective_date'
  | 'effective_time'
  | 'description'
  | 'debit_transaction'
  | 'credit_transaction'
  | 'mutation_amount'
  | 'signed_amount';

type BankStatementField = {
  value: string;
  page_index: number;
  polygon: number[][];
  confidence_mapping: number;
  confidence_reading: number;
};

type BankStatementTransaction = {
  [key in TRANSACTION_FIELDS]: BankStatementField;
};

type BankStatementAccountDetails = {
  [key in ACCOUNT_FIELDS]: BankStatementField;
} & {
  transactions: BankStatementTransaction[];
};

type BankStatementRead = {
  [key in BANK_STATEMENT_FIELDS]: BankStatementField;
} & {
  account_details: BankStatementAccountDetails[];
};

export type BankStatement = OCRRead<BankStatementRead>;
