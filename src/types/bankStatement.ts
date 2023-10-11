import { OCRRead } from './base';

type BANK_STATEMENT_FIELDS =
  | 'bank_name'
  | 'start_period'
  | 'end_period'
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
  value: string | number;
  value_original: string;
  page_index: number;
  polygon: number[][];
  confidence: number;
  confidence_text: number;
};

type BankStatementTransaction = {
  [key in TRANSACTION_FIELDS]: BankStatementField;
};

type BankStatementRead = {
  [key in BANK_STATEMENT_FIELDS]: BankStatementField;
} & {
  transactions: BankStatementTransaction[];
};

export type BankStatement = OCRRead<BankStatementRead>;
