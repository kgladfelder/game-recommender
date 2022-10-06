import { PrismaClient } from '@prisma/client';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { generateAuthToken } from '$lib/authentication';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
	const { username, password } = await request.json();
	if (!username || !password) {
		throw error(401, 'Unauthorized');
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
		return json({
			username: user.username,
			email: user.email,
			authToken: generateAuthToken(user.id, false)
		});
	} else {
		throw error(401, 'Unauthorized');
	}
}
