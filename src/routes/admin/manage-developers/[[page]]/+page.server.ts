import { validateAuthToken } from "$lib/authentication";
import prisma from "$lib/prisma.js";
import { error, redirect, type RequestEvent, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({ cookies, params }: ServerLoadEvent) {
  const authToken = cookies.get("session");
  const jwt = validateAuthToken(authToken);
  let page = Number(params.page);
  if (isNaN(page)) {
    page = 1;
  }
  if (jwt && jwt.admin) {
    try {
      const [count, developers] = await prisma.$transaction([
        prisma.developer.count(),
        prisma.developer.findMany({
          select: {
            id: true,
            name: true,
            country: {
              select: {
                name: true,
              },
            },
          },
          skip: (page - 1) * 10,
          take: 10,
          orderBy: [
            {
              name: "asc",
            },
          ],
        }),
      ]);

      return { developers, count, page };
    } catch (ex) {
      throw error(500, "Somethine went wrong");
    }
  }
  redirect(307, "/");
}

export const actions = {
  create: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const developerName = form.get("developerName");
    const countryName = form.get("country");

    if (typeof developerName !== "string" || typeof countryName !== "string") {
      throw error(500, "Something went wrong");
    }

    if (developerName && countryName) {
      try {
        const country = await prisma.country.upsert({
          where: { name: countryName },
          update: {
            name: countryName,
          },
          create: {
            name: countryName,
          },
        });

        await prisma.developer.create({
          data: {
            name: developerName,
            countryId: country.id,
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
        await prisma.developer.delete({
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
