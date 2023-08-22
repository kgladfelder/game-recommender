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
      const [count, games, publishers, developers, systems, genres] = await prisma.$transaction([
        prisma.game.count(),
        prisma.game.findMany({
          select: {
            id: true,
            name: true,
            gameSystems: {
              select: {
                system: {
                  select: {
                    name: true,
                    usReleaseDate: true,
                  },
                },
              },
            },
          },
          skip: (page - 1) * 10,
          take: 10,
          orderBy: [
            {
              name: "asc",
            },
            {
              usReleaseDate: "asc",
            },
          ],
        }),
        prisma.publisher.findMany({
          select: {
            id: true,
            name: true,
          },
        }),
        prisma.developer.findMany({
          select: {
            id: true,
            name: true,
          },
        }),
        prisma.system.findMany({
          select: {
            id: true,
            name: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        }),
        prisma.genre.findMany({
          select: {
            id: true,
            name: true,
          },
        }),
      ]);

      return { games, publishers, developers, systems, genres, count, page };
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
