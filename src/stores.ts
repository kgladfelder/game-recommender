import type { UIUser } from '$lib/types';
import { writable } from 'svelte/store';

let userSet: UIUser | undefined = undefined;
export const userStore = writable<UIUser>(userSet);

let authTokenSet: String | undefined = undefined;
export const authToken = writable<String>(authTokenSet);
