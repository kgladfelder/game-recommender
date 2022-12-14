import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

import { customResponse } from '$lib/utils';
import * as bcrypt from 'bcrypt';

import { generateAuthToken } from '$lib/authentication';

export const actions = {
	default: async ({ request, cookies }: RequestEvent) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		if (!username || !password)
			return customResponse(400, false, 'Email and Password are required');

		if (typeof username !== 'string' || typeof password !== 'string') {
			return customResponse(400, false, 'Enter a valid email and password.');
		}

		const prisma = new PrismaClient();
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email: username }],
			},
			select: {
				id: true,
				username: true,
				email: true,
				password: true,
				admin: true,
			},
		});

		prisma.$disconnect();

		if (user && user.password && (await bcrypt.compare(password, user.password))) {
			const authToken = generateAuthToken(user.id, user.admin);
			cookies.set('session', authToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 30,
			});
			cookies.set('username', user.username, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 30,
			});

			// return customResponse(200, true, 'User loggedIn successfully');
			throw redirect(307, `/user/${user.username}`);
		}
		throw error(403, 'Invalid credentials.');
	},
};
