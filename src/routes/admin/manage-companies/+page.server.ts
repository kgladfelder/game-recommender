import { validateAuthToken } from "$lib/authentication";
import prisma from "$lib/prisma";
import { error, redirect, type RequestEvent, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({ cookies }: ServerLoadEvent) {
	const authToken = cookies.get("session");
	const jwt = validateAuthToken(authToken);
	if (jwt && jwt.admin) {
		try {
			const companies = await prisma.company.findMany({
				select: {
					id: true,
					name: true,
				},
			});

			if (companies) {
				return { companies };
			} else {
				return { companies: [] };
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
		const companyName = form.get("companyName");

		if (typeof companyName !== "string") {
			throw error(500, "Something went wrong");
		}

		if (companyName) {
			try {
				await prisma.company.create({
					data: {
						name: companyName,
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
				await prisma.company.delete({
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
