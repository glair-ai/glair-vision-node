import {
  isDefined,
  isString,
  isValidURL,
  runSchemaValidation,
} from "../util/validator";

export type SessionCreateParam = {
  success_url: string;
  cancel_url?: string;
};

export function validateSessionCreateParam(param: SessionCreateParam) {
  const createParamValidation = {
    success_url: (val: any) => {
      if (!isDefined(val)) {
        return "Success URL is required";
      }

      if (!isValidURL(val)) {
        return "Success URL must be a valid URL";
      }

      return "";
    },
    cancel_url: (val: any) => {
      if (!isDefined(val) || isValidURL(val)) {
        return "";
      }

      return "Cancel URL must be a valid URL";
    },
  };

  return runSchemaValidation(param, createParamValidation);
}

export type SessionRetrieveParam = {
  sid: string;
};

export function validateSessionRetrieveParam(param: SessionRetrieveParam) {
  const retrieveParamValidation = {
    sid: (val: any) => {
      if (!isDefined(val)) {
        return "Session ID is required";
      }

      if (!isString(val)) {
        return "Sessions ID must be a string";
      }

      return "";
    },
  };

  return runSchemaValidation(param, retrieveParamValidation);
}
