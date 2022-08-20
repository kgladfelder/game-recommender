<script lang="ts">
	import { type hltbSearch, type Game, Genre } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let visible: boolean;
	let box: HTMLDivElement;
	let gameName: string;
	let searchResults: hltbSearch[] = [];
	let searched: boolean = false;

	const dispatch = createEventDispatcher<{ game: Game; cancel: void }>();

	const searchGame = async () => {
		if (gameName) {
			const response = await fetch(`api/game-search?gameName=${gameName}`);
			const data = await response.json();
			searchResults = data.map((hltbResult: hltbSearch) => {
				return { ...hltbResult };
			});
			searched = true;
		}
	};

	const strToGenre = (search: string): Genre => {
		return Object.values(Genre).indexOf(search);
	};

	const getDetail = async (gameId: string) => {
		const response = await fetch(`api/game-details?id=${gameId}`);

		const data: hltbSearch = await response.json();
		console.log(data);
		// TODO: Platform? May need to rethink platform process
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
				japan: data.jpRelease
			}
		});
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
</script>

<div class:hidden-modal="{!visible}" class:modal="{visible}" on:click="{() => cancel()}">
	{#if visible}
		<div class="container" bind:this="{box}" on:click="{(event) => event.stopPropagation()}">
			<form class="row">
				<div class="col s10">
					<h6>Game Search:</h6>
				</div>
				<div class="input-field col s11">
					<label for="gameNameInput" class:active="{gameName}">Game Name</label>
					<input id="gameNameInput" bind:value="{gameName}" autocomplete="off" type="text" />
				</div>
				<div class="col s3 offset-s9">
					<button
						id="cancel-btn"
						on:click|preventDefault="{cancel}"
						class="waves-effect waves-light red lighten-2 btn">
						Cancel
					</button>
					<button
						id="submit-btn"
						on:click|preventDefault="{searchGame}"
						class="waves-effect waves-light btn">
						Submit
					</button>
				</div>
			</form>
			<div class="row results">
				{#each searchResults as result (result.detailId)}
					<div class="col s6 m4 l3">
						<div class="card small blue lighten-3">
							<div class="card-content">
								<span class="card-title">{result.gameName}</span>
								<p>Main Game: {result.main}</p>
								<p>Main Game + Extras: {result.mainExtra}</p>
								<p>Completionist: {result.complete}</p>
							</div>
							<div class="card-action">
								<button
									class="waves-effect waves-light btn btn-width"
									on:click|preventDefault="{() => getDetail(result.detailId)}">Select Game</button>
							</div>
						</div>
					</div>
				{:else}
					{#if !searched}
						<h6 class="s12">Please search for a game.</h6>
					{:else}
						<h6 class="s12">No results found. Please search for another game.</h6>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.modal {
		display: block;
		position: fixed; /* Stay in place */
		z-index: 75; /* Sit on top */
		left: 0;
		width: 100%; /* Full width */
		overflow: hidden; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
		max-height: max-content;
		height: 100%;
	}

	.hidden-modal {
		display: none;
	}

	.container {
		background-color: rgb(255, 255, 255);
		background-color: rgba(255, 255, 255, 1);
		height: calc(100% - 64px);
		margin: 0 auto;
		padding: 1.25em;
		overflow: hidden;
	}

	.results {
		height: calc(50%);
		overflow: auto;
	}

	.card-title {
		font-weight: 500;
	}
</style>
