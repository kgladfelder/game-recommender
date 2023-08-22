import { validateAuthToken } from "$lib/authentication";
import prisma from "$lib/prisma.js";
import { error, type RequestEvent } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
  const authHeader = request.headers.get("authorization");
  const user = validateAuthToken(authHeader);

  if (user) {
    const developer = url.searchParams.get("developer");

    if (developer) {
      const developers = await prisma.developer.findMany({
        where: {
          name: { contains: developer },
        },
        select: {
          id: true,
          name: true,
          games: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return developers;
    } else {
      const developers = await prisma.developer.findMany({
        select: {
          id: true,
          name: true,
          games: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return developers;
    }
  }

  throw error(401, "Unauthorized");
}
