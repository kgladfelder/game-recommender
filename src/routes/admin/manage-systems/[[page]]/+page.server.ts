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
      const [count, systems, companies] = await prisma.$transaction([
        prisma.system.count(),
        prisma.system.findMany({
          select: {
            id: true,
            name: true,
            company: {
              select: {
                name: true,
                id: true,
              },
            },
          },
          skip: (page - 1) * 10,
          take: 10,
          orderBy: [
            {
              company: {
                name: "asc",
              },
            },
            {
              usReleaseDate: "asc",
            },
          ],
        }),
        prisma.company.findMany({
          select: {
            id: true,
            name: true,
          },
        }),
      ]);

      return { systems, companies, count, page };
    } catch (ex) {
      throw error(500, "Something went wrong");
    }
  }
  redirect(307, "/");
}

export const actions = {
  create: async ({ request }: RequestEvent) => {
    const form = await request.formData();
    const systemName = form.get("systemName");
    const company = form.get("company");

    if (typeof systemName !== "string") {
      throw error(500, "Something went wrong");
    }

    if (typeof company !== "string") {
      throw error(500, "Something went wrong");
    }

    if (systemName && company) {
      try {
        await prisma.system.create({
          data: {
            name: systemName,
            companyId: company,
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
        await prisma.system.delete({
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
