import { validateAuthToken } from "$lib/authentication";
import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({params, cookies}: ServerLoadEvent) {
    const authToken = cookies.get('session');
    const jwt = validateAuthToken(authToken);
    if(jwt && jwt.admin) {

    }
    redirect(307, '/');
}

export const actions = {
    
}