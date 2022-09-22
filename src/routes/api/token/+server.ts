import { Prisma, PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
    const { username, password } = await request.json();
    if(!username) {
        throw error(400, "Unable to create user with information provided");
    }
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email: username }
            ]
        },
        select: {
            id: true,
            username: true,
            password: true,
            email: true
        }
    });
    prisma.$disconnect();

    if(!user || !bcrypt.compare(password, user?.password)) {
        throw error(404, "Unknown User");
    }

    return user.id; // TODO: generate JWT and Oauth2 stuff
}
