<script lang="ts">
	import { type hltbSearch, type Game, Genre } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let visible: boolean;
	let box: HTMLDivElement;
	let searchBox: HTMLDivElement;
	let gameName: string;
	let searchResults: hltbSearch[] = [];
	let searched: boolean = false;
	let disabled: boolean = false;

	const dispatch = createEventDispatcher<{ game: Game; cancel: void }>();

	const checkForEnter = async (key: KeyboardEvent) => {
		if (key.key === 'Enter' && !disabled) {
			key.preventDefault();
			searchGame();
		}
	};

	const searchGame = async () => {
		if (gameName) {
			disabled = true;
			const response = await fetch(`api/game-search?gameName=${gameName}`);
			if (response.status === 200) {
				const data: hltbSearch[] = await response.json();
				searchResults = data.map((hltbResult: hltbSearch) => {
					return { ...hltbResult };
				});
			}
			searched = true;
			disabled = false;
		}
	};

	const strToGenre = (search: string): Genre => {
		return Object.values(Genre).indexOf(search);
	};

	const getGameDescription = (description: string): string => {
		try {
			return description.split('\n')[0].trim();
		} catch {
			return '';
		}
	};

	const getDetail = async (gameId: string) => {
		const response = await fetch(`api/game-details?id=${gameId}`);
		if (response.status === 200) {
			const data: hltbSearch = await response.json();
			dispatch('game', {
				id: crypto.randomUUID(),
				createdDate: new Date(),
				gameName: data.gameName,
				mainStory: data.main,
				mainExtras: data.mainExtra,
				completionist: data.complete,
				genres: data.genres.map(strToGenre).filter((x) => x >= 0),
				publisher: data.publisher,
				developer: data.developer,
				releaseDates: {
					northAmerica: data.naRelease,
					europe: data.euRelease,
					japan: data.jpRelease,
				},
				description: getGameDescription(data.gameDescription),
			});
		}
	};

	const cleanUp = () => {
		gameName = '';
		searchResults = [];
		searched = false;
		if (box) {
			box.scrollTop = 0;
		}
	};

	const cancel = () => {
		dispatch('cancel');
		cleanUp();
	};

	$: {
		if (visible && searchBox) {
			searchBox.focus();
		}
	}
</script>

<div class:hidden-modal="{!visible}" class:modal="{visible}" on:click="{() => cancel()}">
	{#if visible}
		<div class="container" bind:this="{box}" on:click="{(event) => event.stopPropagation()}">
			<form>
				<div>
					<h1>Game Search</h1>
				</div>
				<div>
					<label for="gameNameInput">Game Name:</label>
					<input
						id="gameNameInput"
						bind:value="{gameName}"
						bind:this="{searchBox}"
						on:keypress="{checkForEnter}"
						disabled="{disabled}"
						autocomplete="off"
						type="text" />
				</div>
				<div>
					<button
						class="red"
						id="cancel-btn"
						on:click|preventDefault="{cancel}"
						disabled="{disabled}">
						Cancel
					</button>
					<button
						class="green"
						id="submit-btn"
						on:click|preventDefault="{searchGame}"
						disabled="{disabled}">
						Submit
					</button>
				</div>
			</form>
			<div class="results">
				{#each searchResults as result (result.detailId)}
					<div class="result" data-testid="{`game-card-${result.gameName}`}">
						<h2>
							{result.gameName}
						</h2>
						<div class="game-hours">
							<div>
								<div class="game-info">{result.main}</div>
								<div class="game-info-desc">Main Story</div>
							</div>
							<div>
								<div class="game-info">{result.mainExtra}</div>
								<div class="game-info-desc">Extras</div>
							</div>
							<div>
								<div class="game-info">{result.complete}</div>
								<div class="game-info-desc">Complete</div>
							</div>
						</div>
						<div>
							<button
								class="blue submit-btn"
								on:click|preventDefault="{() => getDetail(result.detailId)}">
								Select Game
							</button>
						</div>
					</div>
				{:else}
					{#if !searched}
						<h2>Please search for a game.</h2>
					{:else}
						<h2>No results found. Please search for another game.</h2>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.modal {
		display: block;
		position: fixed;
		z-index: 75;
		left: 0;
		width: 100%;
		overflow: hidden;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
		max-height: max-content;
		height: calc(100% - 80px);
	}

	.hidden-modal {
		display: none;
	}

	.container {
		background-color: rgb(255, 255, 255);
		background-color: rgba(255, 255, 255, 1);
		height: calc(100%);
		margin: 0 auto;
		padding: 1.25em;
		overflow: hidden;
		width: 75%;
	}

	.results {
		height: 75%;
		width: 100%;
		overflow: auto;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.result {
		border-style: solid;
		border-width: 2px;
		padding: 0.5em;
		margin: 0.5em;
		width: 30%;
		height: 15rem;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.submit-btn {
		position: absolute;
		bottom: 5px;
		right: 5px;
	}

	.blue {
		background-color: blue;
		color: white;
	}

	.red {
		background-color: red;
		color: white;
	}

	.green {
		background-color: green;
		color: white;
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
</style>
