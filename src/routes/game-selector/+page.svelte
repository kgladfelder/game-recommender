<script lang="ts">
	import { gameStore } from '../../stores';
	import type { Game } from '$lib/types';
	import LargeGameCard from '$lib/components/large-game-card/index.svelte';
	import SmallGameCard from '$lib/components/small-game-card/index.svelte';

	let selectedGame: Game | undefined;
	let games = $gameStore
		.filter((x) => x.completedDate === undefined)
		.sort((a, b) => {
			if (a.gameName > b.gameName) {
				return 1;
			} else if (a.gameName < b.gameName) {
				return -1;
			} else {
				return 0;
			}
		});

	const chooseRandom = () => {
		const possibleGames = $gameStore.filter((x) => x.completedDate === undefined);
		selectedGame = possibleGames[Math.floor(Math.random() * possibleGames.length)];
	};

	chooseRandom();
</script>

<div>
	<div>
		{#if selectedGame}
			<LargeGameCard game="{selectedGame}" />
			<button on:click="{chooseRandom}"> Choose Another </button>
		{/if}
	</div>
	<div class="games-list">
		{#each games as game}
			<SmallGameCard game="{game}" />
		{/each}
	</div>
</div>

<style>
	.games-list {
		display: flex;
	}

	button {
		margin-left: 1em;
	}
</style>
