import { error } from "@sveltejs/kit";

export const customResponse = (
  status: number,
  success: boolean,
  message: string,
  data?: unknown
) => {
  if (success) {
    return {
      success: success,
      message: message,
      info: data,
    };
  }
  return error(status, message);
};

export const textFieldInvalid = (value: string | undefined, required = false): boolean => {
  if (!required && value === undefined) {
    return true;
  }
  return value === undefined || value === "";
};

export const numberFieldInvalid = (value: number | undefined, required = false): boolean => {
  if (!required && value === undefined) {
    return false;
  }
  return value === undefined || Number.isNaN(value);
};

export const dateFieldInvalid = (value: Date | undefined, required = false): boolean => {
  if (!required && value === undefined) {
    return false;
  }
  return value === undefined || Number.isNaN(value);
};
