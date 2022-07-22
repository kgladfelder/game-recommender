import { writable } from 'svelte/store';

import type { Game } from "./types";

let gameSet: Game[] = [];
if(typeof window !== "undefined") {
    gameSet = JSON.parse(localStorage.getItem('games') || "[]");
}


export const gameStore = writable<Game[]>(gameSet);
