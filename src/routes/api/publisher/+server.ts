import { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: RequestEvent) {
	const publisher = url.searchParams.get('publisher');

	if (publisher) {
		const prisma = new PrismaClient();
		const publishers = await prisma.publisher.findMany({
			where: { 
                name: { contains: publisher } 
            },
			select: {
				id: true,
				name: true,
                games: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
			},
		});
		await prisma.$disconnect();

		return publishers;
	} else {
		const prisma = new PrismaClient();
		const publishers = await prisma.publisher.findMany({
			select: {
				id: true,
				name: true,
                games: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
			},
		});
		await prisma.$disconnect();

		return publishers;
	}
}
