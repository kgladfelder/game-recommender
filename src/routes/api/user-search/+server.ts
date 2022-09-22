import { PrismaClient } from '@prisma/client';
import { error, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: RequestEvent) {
    const username = url.searchParams.get('username');

    if(!username) {
        throw error(400, "Username not provided");
    }

    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            username
        },
        select: {
            id: true,
            username: true,
            email: true,
            userGames: {
                select: {
                    game: {
                        select: {
                            name: true,
                            main: true,
                            extras: true,
                            completionist: true,
                            description: true,
                            publisher: {
                                select: {
                                    name: true
                                }
                            },
                            developer: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    completed: true,
                    completedTime: true,
                    userSystem: {
                        select: {
                            gameSystem: {
                                select: {
                                    system: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    await prisma.$disconnect();

    return user;
}