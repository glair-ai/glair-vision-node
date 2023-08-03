export type Invoice = {
  read: {
    [key in INVOICE_FIELDS]: {
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

type INVOICE_FIELDS =
  | "invoice_number"
  | "invoice_date"
  | "invoice_due_date"
  | "purchase_order"
  | "vendor_name"
  | "vendor_tax_id"
  | "vendor_address"
  | "customer_name"
  | "customer_tax_id"
  | "customer_address"
  | "shipping_address"
  | "shipping_address_recipient"
  | "payment_term"
  | "sub_total_amount"
  | "invoice_total_tax"
  | "invoice_total"
  | "remittance_address"
  | "remittance_address_recipient"
  | "currency";

type ITEM_FIELDS =
  | "item_name"
  | "item_quantity"
  | "item_price"
  | "item_unit_price"
  | "item_product_code"
  | "item_unit";
