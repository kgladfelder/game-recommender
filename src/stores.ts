import type { User } from '@prisma/client';
import { writable } from 'svelte/store';

let userSet: User | undefined = undefined;
export const userStore = writable<User>(userSet);
