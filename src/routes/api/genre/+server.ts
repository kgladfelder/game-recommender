import { validateAuthToken } from '$lib/authentication';
import { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
	const authHeader = request.headers.get('authorization');
	const user = validateAuthToken(authHeader);

	if (user) {
		const genre = url.searchParams.get('genre');

		if (genre) {
			const prisma = new PrismaClient();
			const genres = await prisma.genre.findMany({
				where: {
					name: { contains: genre },
				},
				select: {
					id: true,
					name: true,
					gameGenres: {
						select: {
							game: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});
			await prisma.$disconnect();
			//TODO: Flatten gameGenres
			return genres;
		} else {
			const prisma = new PrismaClient();
			const genres = await prisma.genre.findMany({
				select: {
					id: true,
					name: true,
					gameGenres: {
						select: {
							game: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});
			await prisma.$disconnect();
			//TODO: Flatten gameGenres
			return genres;
		}
	}
	throw error(401, 'Unauthorized');
}
