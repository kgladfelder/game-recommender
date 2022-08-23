<script lang="ts">
	import type { Game } from '$lib/types';
	import { gameStore } from '../../stores';
	import GameInformation from '$lib/components/game-information/index.svelte';
	import GameSearchAndSelect from '$lib/components/game-search-and-select/index.svelte';
	import GameCard from '$lib/components/game-card/index.svelte';
	import GameRow from '$lib/components/game-row/index.svelte';

	let addGameModalVis: boolean = false;
	let editGameModalVis: boolean = false;

	let editedGame: Game | undefined = undefined;
	let editedGameInd: number | undefined = undefined;
	let gridVis: boolean = true;
	let tableVis: boolean = false;
	let gameListFilter: string = '';
	let games: Game[] = $gameStore;

	const setLocalStorage = () => {
		localStorage.setItem('games', JSON.stringify($gameStore));
	};

	const editGameEvent = (event: CustomEvent<string>) => {
		editGame(event.detail);
	};

	const editGame = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		editedGameInd = ind;
		editedGame = $gameStore.at(ind);
		editGameModalVis = true;
	};

	const onNewGame = () => {
		addGameModalVis = true;
	};

	const onEditGame = (editGameEvent: CustomEvent<Game>) => {
		if (editedGameInd !== undefined && editedGameInd >= 0) {
			$gameStore[editedGameInd] = editGameEvent.detail;
			$gameStore = $gameStore;
			setLocalStorage();
		}
		editedGame = undefined;
		editedGameInd = undefined;
		editGameModalVis = false;
	};

	const confirmDeleteEvent = (event: CustomEvent<string>) => {
		confirmDelete(event.detail);
	};

	const confirmDelete = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		if (ind > -1) {
			$gameStore.splice(ind, 1);
			$gameStore = $gameStore;
			setLocalStorage();
		}
	};

	const completeGameEvent = (event: CustomEvent<string>) => {
		completeGame(event.detail);
	};

	const completeGame = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		if (ind > -1) {
			if (!$gameStore[ind].completedDate) {
				$gameStore[ind].completedDate = new Date();
			} else {
				$gameStore[ind].completedDate = undefined;
			}
			setLocalStorage();
		}
		return null;
	};

	const onNewGameRet = (newGameEvent: CustomEvent<Game>) => {
		if (newGameEvent.detail) {
			$gameStore.push(newGameEvent.detail);
			$gameStore = $gameStore;
			setLocalStorage();
		}
		addGameModalVis = false;
	};

	const onAddGameCancel = () => {
		addGameModalVis = false;
	};

	const onEditGameCancel = () => {
		editGameModalVis = false;
	};

	const onTableViewClick = () => {
		gridVis = false;
		tableVis = true;
	};

	const onGridViewClick = () => {
		gridVis = true;
		tableVis = false;
	};

	$: games =
		gameListFilter !== ''
			? $gameStore.filter((x) => x.gameName.toLowerCase().includes(gameListFilter.toLowerCase()))
			: $gameStore;
</script>

<div style="height: calc(100% - 64px);">
	<GameSearchAndSelect
		visible="{addGameModalVis}"
		on:cancel="{onAddGameCancel}"
		on:game="{onNewGameRet}" />
	{#if editedGame}
		<GameInformation
			visible="{editGameModalVis}"
			id="{editedGame.id}"
			createdDate="{editedGame.createdDate}"
			gameName="{editedGame.gameName}"
			mainStory="{editedGame.mainStory}"
			mainExtras="{editedGame.mainExtras}"
			completionist="{editedGame.completionist}"
			publisher="{editedGame.publisher}"
			developer="{editedGame.developer}"
			platform="{editedGame.platform}"
			genres="{editedGame.genres}"
			releaseDates="{editedGame.releaseDates}"
			on:game="{onEditGame}"
			on:cancel="{onEditGameCancel}" />
	{/if}
	<div class="row search-row">
		<div class="col s3">
			<button on:click="{onNewGame}" class="waves-effect waves-light btn btn-width">
				Add Game
			</button>
		</div>
		<div class="input-field col s6">
			<label for="gameNameInput">Filter Games by Name:</label>
			<input id="gameNameInput" bind:value="{gameListFilter}" autocomplete="off" type="text" />
		</div>
		<div class="col s3 view">
			<div>
				<span class="text">View: </span>
				<button
					title="Switch to grid view"
					class="waves-effect waves-light btn"
					class:blue="{gridVis}"
					class:grey="{!gridVis}"
					on:click="{onGridViewClick}">
					<i class="material-icons text">widgets</i>
				</button>
				<button
					title="Switch to table view"
					class="waves-effect waves-light btn"
					class:blue="{tableVis}"
					class:grey="{!tableVis}"
					on:click="{onTableViewClick}">
					<i class="material-icons text">list</i>
				</button>
			</div>
		</div>
	</div>

	{#if tableVis}
		<div class="row">
			<table class="col s10 offset-s1">
				<thead>
					<tr>
						<th>Game Name</th>
						<th>Platform</th>
						<th>Genres</th>
						<th>Main Story</th>
						<th>Main + Extras</th>
						<th>Completionist</th>
						<th>Developer</th>
						<th>Publisher</th>
						<th>Date Added</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each games as game (game.id)}
						<GameRow
							game="{game}"
							on:complete="{completeGameEvent}"
							on:edit="{editGameEvent}"
							on:delete="{confirmDeleteEvent}" />
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if gridVis}
		<div class="row">
			{#each games as game (game.id)}
				<GameCard
					game="{game}"
					on:complete="{completeGameEvent}"
					on:edit="{editGameEvent}"
					on:delete="{confirmDeleteEvent}" />
			{/each}
		</div>
	{/if}
</div>

<style>
	.btn-width {
		width: 12em;
	}

	.row {
		text-decoration: none;
	}

	.search-row {
		display: flex;
		align-items: center;
	}

	.view .text {
		font-size: small;
	}

	.view .btn {
		font-size: small;
	}

	.view .btn .text {
		margin: -1em;
	}
</style>
