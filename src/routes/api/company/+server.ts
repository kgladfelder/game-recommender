import { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';
import { validateAuthToken } from '$lib/authentication';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
	const authHeader = request.headers.get('authorization');
	const user = validateAuthToken(authHeader);

	if (user) {
		const companyName = url.searchParams.get('companyname');

		if (companyName) {
			const prisma = new PrismaClient();
			const companies = await prisma.company.findMany({
				where: {
					name: { contains: companyName },
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

	throw error(401, 'Unauthorized');
}
