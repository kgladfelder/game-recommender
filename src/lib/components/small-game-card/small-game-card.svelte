<script lang="ts">
	import type { Game } from '$lib/types';

	export let game: Game;

	let hoursArray: { hours: number | undefined; section: string }[] = [];

	$: hoursArray = [
		{
			hours: game.mainStory,
			section: 'Main',
		},
		{
			hours: game.mainExtras,
			section: 'Extras',
		},
		{
			hours: game.completionist,
			section: 'Complete',
		},
	];
</script>

<div class="card" class:completed="{game.completedDate !== undefined}">
	<h2>
		{game.gameName}
	</h2>
	<div class="game-hours">
		{#each hoursArray as ha}
			<div>
				<div class="game-info">{ha.hours ?? ''}</div>
				<div class="game-info-desc">{ha.section}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	h2 {
		font-size: larger;
		line-height: 1em;
	}

	.card {
		border-style: solid;
		border-width: 2px;
		padding: 1em;
		margin: 1em;
		width: 25em;
	}

	.game-hours {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.game-info-desc {
		font-weight: 400;
	}

	.game-info {
		font-weight: 700;
		font-size: x-large;
	}

	.completed {
		background-color: rgba(100, 250, 100);
	}
</style>
