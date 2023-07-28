import { validateAuthToken } from "$lib/authentication";
import prisma from "$lib/prisma";
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
      const [count, publishers] = await prisma.$transaction([
        prisma.publisher.count(),
        prisma.publisher.findMany({
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

      return { publishers, count, page };
    } catch (ex) {
      throw error(500, "Something went wrong");
    }
  }
  redirect(307, "/");
}

export const actions = {
  create: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const publisherName = form.get("publisherName");
    const countryName = form.get("countryName");

    if (typeof publisherName !== "string" || typeof countryName !== "string") {
      throw error(500, "Something went wrong");
    }

    if (publisherName && countryName) {
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

        await prisma.publisher.create({
          data: {
            name: publisherName,
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
        await prisma.publisher.delete({
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
