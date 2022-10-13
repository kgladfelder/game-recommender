import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }: RequestEvent) => {
		const form = await request.formData();
		const username = form.get('username');
		const email = form.get('email');
		const password = form.get('password');

		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const passwordRegex = /(?=.*\d)(?=.*[\W_]).{7,}/;

		if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
			throw error(400, 'Unable to create user with information provided');
		}

		if (
			!username ||
			!email ||
			!password ||
			!emailRegex.test(String(email).toLowerCase()) ||
			!passwordRegex.test(String(password))
		) {
			throw error(400, 'Unable to create user with information provided');
		}

		const saltRounds = 10;
		const prisma = new PrismaClient();
		try {
			await prisma.user.create({
				data: {
					username,
					email,
					password: await bcrypt.hash(password, saltRounds),
				},
				select: {
					id: true,
					username: true,
					email: true,
				},
			});

			prisma.$disconnect();
		} catch (e) {
			throw error(500, 'Something went wrong');
		}
		throw redirect(307, '/login');
	},
};
