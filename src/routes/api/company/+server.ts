import prisma from "$lib/prisma.js";
import { error, type RequestEvent } from "@sveltejs/kit";
import { validateAuthToken } from "$lib/authentication";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, request }: RequestEvent) {
  const authHeader = request.headers.get("authorization");
  const user = validateAuthToken(authHeader);

  if (user) {
    const companyName = url.searchParams.get("companyname");

    if (companyName) {
      const companies = await prisma.company.findMany({
        where: {
          name: { contains: companyName },
        },
        select: {
          id: true,
          name: true,
        },
      });

      return companies;
    } else {
      const companies = await prisma.company.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      return companies;
    }
  }

  throw error(401, "Unauthorized");
}
