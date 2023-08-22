import { validateAuthToken } from "$lib/authentication";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
  const authToken = cookies.get("session");
  try {
    const jwt = validateAuthToken(authToken);
    return { username: cookies.get("username"), admin: jwt.admin };
  } catch {
    return { username: cookies.get("username") };
  }
};
