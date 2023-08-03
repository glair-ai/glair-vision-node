export type Receipt = {
  read: {
    [key in RECEIPT_FIELDS]: {
      confidence: number;
      value: string;
    };
  } & {
    items: {
      [key in ITEM_FIELDS]: {
        confidence: number;
        value: string;
      };
    }[];
  };
  status: string;
  reason?: string;
};

type RECEIPT_FIELDS =
  | "merchant_name"
  | "merchant_address"
  | "receipt_date"
  | "receipt_time"
  | "sub_total_amount"
  | "tax_amount"
  | "tip_amount"
  | "total_amount";

type ITEM_FIELDS =
  | "item_name"
  | "item_quantity"
  | "item_total_price"
  | "item_product_code";
