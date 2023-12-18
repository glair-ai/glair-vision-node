export type SingaporeFamilyPass = {
  images: {
    photo: string;
  };
  read: {
    [key in FAMILY_PASS_FIELDS]: {
      confidence: number;
      value: string;
    };
  };
  reason: string;
  status: string;
};

type FAMILY_PASS_FIELDS =
  | "address"
  | "card_number"
  | "card_type"
  | "date_of_birth"
  | "expiry_date"
  | "fin"
  | "issue_date"
  | "name"
  | "nationality"
  | "pass_status"
  | "sex";
