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

export const textFieldInvalid = (value: string): boolean => {
	return value === undefined || value === "";
};

export const numberFieldInvalid = (value: number): boolean => {
	return value === undefined || Number.isNaN(value);
};

export const dateFieldInvalid = (value: Date): boolean => {
	return value === undefined || Number.isNaN(value);
};
