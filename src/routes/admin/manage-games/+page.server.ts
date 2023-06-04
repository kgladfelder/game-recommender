import { validateAuthToken } from "$lib/authentication";
import prisma from "$lib/prisma";
import { error, redirect, type RequestEvent, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({ cookies }: ServerLoadEvent) {
	const authToken = cookies.get("session");
	const jwt = validateAuthToken(authToken);
	if (jwt && jwt.admin) {
		try {
			const games = await prisma.game.findMany({
				select: {
					id: true,
					name: true,
				},
			});

			if (games) {
				return { games };
			} else {
				return { games: [] };
			}
		} catch (ex) {
			throw error(500, "Something went wrong");
		}
	}
	redirect(307, "/");
}

export const actions = {
	create: async ({ request }: RequestEvent) => {
		const form = await request.formData();
		const gameName = form.get("companyName");

		if (typeof gameName !== "string") {
			throw error(500, "Something went wrong");
		}

		if (gameName) {
			try {
				await prisma.game.create({
					data: {
						name: gameName,
					},
				});
			} catch (ex) {
				throw error(500, "Something went wrong");
			}
		}
	},
	delete: async ({ request }: RequestEvent) => {
		const form = await request.formData();
		const id = form.get("id");
		
		if (typeof id !== "string") {
			throw error(500, "Something went wrong");
		}

		if (id) {
			try {
				await prisma.game.delete({
					where: {
						id: id,
					},
				});
			} catch (ex) {
				throw error(500, "Something went wrong");
			}
		}
	},
};
