import { validateAuthToken } from '$lib/authentication';
import { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
	const authHeader = request.headers.get('authorization');
	const user = validateAuthToken(authHeader);

	if (user) {
		const developer = url.searchParams.get('developer');

		if (developer) {
			const prisma = new PrismaClient();
			const developers = await prisma.developer.findMany({
				where: {
					name: { contains: developer },
				},
				select: {
					id: true,
					name: true,
					games: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});
			await prisma.$disconnect();

			return developers;
		} else {
			const prisma = new PrismaClient();
			const developers = await prisma.developer.findMany({
				select: {
					id: true,
					name: true,
					games: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});
			await prisma.$disconnect();

			return developers;
		}
	}

	throw error(401, 'Unauthorized');
}
