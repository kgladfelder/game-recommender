import { validateAuthToken } from '$lib/authentication';
import { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
	const authHeader = request.headers.get('authorization');
	const user = validateAuthToken(authHeader);

	if (user) {
		const systemName = url.searchParams.get('systemname');

		if (systemName) {
			const prisma = new PrismaClient();
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
			await prisma.$disconnect();

			return systems;
		} else {
			const prisma = new PrismaClient();
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
			await prisma.$disconnect();

			return systems;
		}
	}
	throw error(401, 'Unauthorized');
}
