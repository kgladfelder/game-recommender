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

export const fieldInvalid = (value: string): boolean => {
	return value === undefined || value === "";
};
