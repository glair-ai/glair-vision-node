export type SingaporeWorkPermit = {
  images: {
    photo: string;
  };
  read: {
    [key in FAMILY_WORK_PERMIT]: {
      confidence: number;
      value: string;
    };
  };
  reason: string;
  status: string;
};

type FAMILY_WORK_PERMIT =
  | "card_number"
  | "card_type"
  | "date_of_apply"
  | "date_of_birth"
  | "date_of_expiry"
  | "date_of_issue"
  | "employer"
  | "fin"
  | "location"
  | "name"
  | "nationality"
  | "occupation"
  | "sector"
  | "sex"
  | "work_permit_no";
