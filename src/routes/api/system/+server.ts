import { validateAuthToken } from '$lib/authentication';
import prisma from '$lib/prisma.js';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
	const authHeader = request.headers.get('authorization');
	const user = validateAuthToken(authHeader);

	if (user) {
		const systemName = url.searchParams.get('systemname');

		if (systemName) {
			const systems = await prisma.system.findMany({
				where: {
					OR: [
						{ name: { contains: systemName } },
						{ name: systemName }, //TODO: Rebuild prisma and check against alias list
					],
				},
				select: {
					id: true,
					name: true,
					company: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			return systems;
		} else {
			const systems = await prisma.system.findMany({
				select: {
					id: true,
					name: true,
					company: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			return systems;
		}
	}
	throw error(401, 'Unauthorized');
}
