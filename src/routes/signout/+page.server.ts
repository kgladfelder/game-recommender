import { redirect, type RequestEvent } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies }: RequestEvent) => {
    cookies.delete("session");
    cookies.delete("username");
    throw redirect(307, "/login");
  },
};
