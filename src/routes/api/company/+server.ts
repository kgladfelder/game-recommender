import { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: RequestEvent) {
	const companyName = url.searchParams.get('companyname');

	if (companyName) {
		const prisma = new PrismaClient();
		const companies = await prisma.company.findMany({
			where: { 
                name: { contains: companyName } 
            },
			select: {
				id: true,
				name: true,
			},
		});
		await prisma.$disconnect();

		return companies;
	} else {
		const prisma = new PrismaClient();
		const companies = await prisma.company.findMany({
			select: {
				id: true,
				name: true,
			},
		});
		await prisma.$disconnect();

		return companies;
	}
}
