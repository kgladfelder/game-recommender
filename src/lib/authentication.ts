import { error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '$env/static/private';

import type { AccessToken } from './types';

export const generateAuthToken = (userId: string, admin: boolean): string => {
	const token: AccessToken = {
		userId,
		admin,
		timeToExpire: Date.now() / 1000 + 3600,
	};
	return jwt.sign(token, JWT_KEY);
};

export const validateAuthToken = (token: string | null): AccessToken => {
	if (!token) {
		throw error(401, 'Unauthorized');
	}

	try {
		const jwtToken = jwt.verify(token, JWT_KEY) as jwt.JwtPayload;
		if (
			'userId' in jwtToken &&
			'admin' in jwtToken &&
			'timeToExpire' in jwtToken &&
			jwtToken.timeToExpire < Date.now() / 1000
		) {
			const accessToken: AccessToken = {
				userId: jwtToken.userId,
				admin: jwtToken.admin,
				timeToExpire: jwtToken.timeToExpire,
			};
			return accessToken;
		}
		throw error(401, 'Unauthorized');
	} catch (ex) {
		throw error(401, 'Unauthorized');
	}
};
