import { error, type ServerLoadEvent } from "@sveltejs/kit";
import prisma from "$lib/prisma.js";
import { validateAuthToken } from "$lib/authentication";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }: ServerLoadEvent) {
	if (!params.username) {
		throw error(404, "Not found");
	}
	const authToken = cookies.get("session");
	const jwt = validateAuthToken(authToken);
	if (jwt) {
		try {
			const user = await prisma.user.findFirst({
				where: {
					username: params.username,
					id: jwt.userId, // TODO: better way to limit user page to just that user (for now)
				},
				select: {
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
											name: true,
										},
									},
									developer: {
										select: {
											name: true,
										},
									},
								},
							},
							completed: true,
							completedTime: true,
							userSystem: {
								select: {
									gameSystem: {
										select: {
											system: {
												select: {
													name: true,
												},
											},
										},
									},
								},
							},
						},
					},
				},
			});

			if (user) {
				return user;
			}
		} catch (ex) {
			throw error(500, "Something went wrong");
		}
	}
	throw error(401, "Unauthorized");
}
