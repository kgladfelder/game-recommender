import { validateAuthToken } from "$lib/authentication";
import prisma from "$lib/prisma.js";
import { error, redirect, type RequestEvent, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({ cookies }: ServerLoadEvent) {
  const authToken = cookies.get("session");
  const jwt = validateAuthToken(authToken);
  if (jwt && jwt.admin) {
    try {
      const developers = await prisma.developer.findMany({
        select: {
          id: true,
          name: true,
          country: {
            select: {
              name: true,
            },
          },
        },
      });

      if (developers) {
        return { developers };
      } else {
        return { developers: [] };
      }
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
