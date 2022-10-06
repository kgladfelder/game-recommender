import { PrismaClient } from '@prisma/client';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
	const { username, email, password } = await request.json();
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /(?=.*\d)(?=.*[\W_]).{7,}/;

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
		const user = await prisma.user.create({
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

		return json(user);
	} catch (e) {
		console.error(e);
		throw error(500, 'Something went wrong');
	}
}
