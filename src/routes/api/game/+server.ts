import { validateAuthToken } from '$lib/authentication';
import type { Prisma } from '@prisma/client';
import prisma from '$lib/prisma.js';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
	const authHeader = request.headers.get('authorization');
	const user = validateAuthToken(authHeader);

	if (user) {
		const gamename = url.searchParams.get('gamename');

		if (!gamename) {
			throw error(400, 'Username not provided');
		}

		//TODO: allow searching by more than just gamename, build dynamically generated select statements based on parameters
		const gameSelect: Prisma.GameSelect = {
			id: true,
			name: true,
			main: true,
			extras: true,
			completionist: true,
			description: true,
			usReleaseDate: true,
			euReleaseDate: true,
			jpReleaseDate: true,
			publisher: {
				select: {
					id: true,
					name: true,
				},
			},
			developer: {
				select: {
					id: true,
					name: true,
				},
			},
			gameSystems: {
				select: {
					system: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
			gameGenres: {
				select: {
					genre: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		};

		const games = await prisma.game.findMany({
			where: {
				name: { contains: gamename }, //TODO: make this a more generalized search (case insensitive, etc)
			},
			select: gameSelect,
		});
		
		//TODO: Flatten gameSystems and gameGenres
		return games;
	}

	throw error(401, 'Unauthorized');
}
