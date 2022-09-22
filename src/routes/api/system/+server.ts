import { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: RequestEvent) {
	const systemName = url.searchParams.get('systemname');

	if (systemName) {
        const prisma = new PrismaClient();
		const systems = await prisma.system.findMany({
            where: {
                OR: [
                    {name: { contains: systemName }},
                    {name: systemName} //TODO: Rebuild prisma and check against alias list
                ]
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
