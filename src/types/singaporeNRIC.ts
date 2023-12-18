export type SingaporeNRIC = {
  images: {
    photo: string;
  };
  read: {
    [key in NRIC_FIELDS]: {
      confidence: number;
      value: string;
    };
  };
  reason: string;
  status: string;
};

type NRIC_FIELDS =
  | "address"
  | "blood_type"
  | "card_number"
  | "country_of_birth"
  | "date_of_birth"
  | "issue_date"
  | "name"
  | "nationality"
  | "nric_no"
  | "race"
  | "sex";
