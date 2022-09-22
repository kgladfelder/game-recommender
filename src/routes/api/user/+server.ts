import { Prisma, PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
    const { username, email, password } = await request.json();
    if(!username || !email || !password) {
        throw error(400, "Unable to create user with information provided");
    }
    const saltRounds = 10;
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: await bcrypt.hash(password, saltRounds)
        },
        select: {
            id: true,
            username: true,
            email: true
        }
    });
    
    prisma.$disconnect();

    return user;
}

// To check a password:
// bcrypt.compare(password, hash)