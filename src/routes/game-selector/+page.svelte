<script lang="ts">
	import { gameStore } from '../../stores';
	import type { Game } from '$lib/types';
	import LargeGameCard from '$lib/components/large-game-card/large-game-card.svelte';
	import SmallGameCard from '$lib/components/small-game-card/small-game-card.svelte';

	const gameHours = $gameStore
		.filter((x) => x.completedDate === undefined)
		.flatMap((x) => {
			let ret: number[] = [];
			if (x.mainStory !== undefined && x.mainStory >= 0) {
				ret.push(x.mainStory);
			}
			if (x.mainExtras !== undefined && x.mainExtras >= 0) {
				ret.push(x.mainExtras);
			}
			if (x.completionist !== undefined && x.completionist >= 0) {
				ret.push(x.completionist);
			}
			return ret;
		});

	let selectedGame: Game | undefined;
	let timer: NodeJS.Timeout;
	let minHours: number = Math.min(...gameHours);
	let minHoursInput: number = minHours;
	let maxHours: number = Math.max(...gameHours);
	let maxHoursInput: number = maxHours;
	let developer: string = '';
	let developerInput: string = '';
	let publisher: string = '';
	let publisherInput: string = '';

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

	const reset = () => {
		minHoursInput = Math.min(...gameHours);
		minHours = Math.min(...gameHours);
		maxHoursInput = Math.max(...gameHours);
		maxHours = Math.max(...gameHours);
		chooseRandom();
	};

	const chooseRandom = () => {
		selectedGame = games[Math.floor(Math.random() * games.length)];
	};

	const onMinHoursChange = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (minHoursInput < 0) {
				minHoursInput = 0;
			}
			minHours = maxHoursInput;
			if (maxHours < maxHoursInput) {
				maxHours = maxHoursInput;
				maxHoursInput = maxHoursInput;
			}
		}, 500);
	};

	const onMaxHoursChange = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (maxHoursInput < 0) {
				maxHoursInput = 0;
			}
			maxHours = maxHoursInput;
			if (minHours > maxHoursInput) {
				minHours = maxHoursInput;
				minHoursInput = maxHoursInput;
			}
		}, 500);
	};

	const onPublisherChange = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			publisher = publisherInput;
		}, 500);
	};

	const onDeveloperChange = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			developer = developerInput;
		}, 500);
	};

	$: {
		games = $gameStore.filter(
			(x) =>
				x.completedDate === undefined &&
				((x.mainStory && x.mainStory >= minHours) ||
					(x.mainExtras && x.mainExtras >= minHours) ||
					(x.completionist && x.completionist >= minHours)) &&
				((x.mainStory && x.mainStory <= maxHours) ||
					(x.mainExtras && x.mainExtras <= maxHours) ||
					(x.completionist && x.completionist <= maxHours)) &&
				(!developer || x.developer?.includes(developer)) &&
				(!publisher || x.publisher?.includes(publisher))
		);
		chooseRandom();
	}

	chooseRandom();
</script>

<div>
	<div class="input-grouping">
		<div>
			<label for="minHours">Minimum Hours:</label>
			<input
				type="number"
				name="minHours"
				on:input="{onMinHoursChange}"
				bind:value="{minHoursInput}"
				min="0"
				step="0.01" />
			<label for="maxHours">Maximum Hours:</label>
			<input
				type="number"
				name="maxHours"
				on:input="{onMaxHoursChange}"
				bind:value="{maxHoursInput}"
				min="0"
				step="0.01" />
			<label for="developer">Developer:</label>
			<input
				type="text"
				name="developer"
				on:input="{onDeveloperChange}"
				bind:value="{developerInput}" />
			<label for="publisher">Publisher:</label>
			<input
				type="text"
				name="publisher"
				on:input="{onPublisherChange}"
				bind:value="{publisherInput}" />
		</div>
		<!-- Platform filter - TODO -->
		<!-- Genre filter - TODO -->
	</div>
	<div class="button-grouping">
		<button on:click="{chooseRandom}" class="green">Choose Another</button>
		<button on:click="{reset}" class="red">Reset</button>
	</div>
	<div>
		{#if selectedGame}
			<LargeGameCard game="{selectedGame}" />
		{:else}
			<div>No matches found.</div>
		{/if}
	</div>
</div>

<style>
	.input-grouping {
		display: flex;
		flex-direction: column;
	}

	.button-grouping {
		margin-left: 1rem;
	}

	.red {
		background-color: red;
		color: white;
	}

	.green {
		background-color: green;
		color: white;
	}

	button {
		border: none;
		text-align: center;
		align-content: center;
		text-decoration: none;
		display: inline-block;
		font-size: 18px;
	}

	label {
		margin-left: 1.25rem;
		font-size: 18px;
	}

	input:focus {
		outline: none;
	}

	input[type='text'] {
		border: none;
		border-bottom: 0.125rem solid;
		width: 10rem;
		height: 1.5rem;
		font-size: 1rem;
		padding-left: 0.875rem;
		margin-bottom: 0.5rem;
		margin-top: 0.125rem;
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
		border: none;
		border-bottom: 0.125rem solid;
		width: 3rem;
		height: 1.5rem;
		font-size: 1rem;
		padding-left: 0.875rem;
		margin-bottom: 0.5rem;
		margin-top: 0.125rem;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
