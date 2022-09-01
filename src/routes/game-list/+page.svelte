<script lang="ts">
	import type { Game } from '$lib/types';
	import { gameStore } from '../../stores';
	import GameInformation from '$lib/components/game-information/game-information.svelte';
	import GameSearchAndSelect from '$lib/components/game-search-and-select/game-search-and-select.svelte';
	import GameCard from '$lib/components/game-card/game-card.svelte';
	import GameRow from '$lib/components/game-row/game-row.svelte';

	let addGameModalVis: boolean = false;
	let editGameModalVis: boolean = false;

	let editedGame: Game | undefined = undefined;
	let editedGameInd: number | undefined = undefined;
	let gridVis: boolean = true;
	let tableVis: boolean = false;
	let gameListFilter: string = '';
	let games: Game[] = $gameStore.sort((a, b) => {
		if (a.gameName > b.gameName) {
			return 1;
		} else if (a.gameName < b.gameName) {
			return -1;
		} else {
			return 0;
		}
	});

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

<div class="game-list-page">
	{#if addGameModalVis}
		<GameSearchAndSelect
			visible="{addGameModalVis}"
			on:cancel="{onAddGameCancel}"
			on:game="{onNewGameRet}" />
	{:else if editedGame && editGameModalVis}
		<GameInformation
			visible="{editGameModalVis}"
			game="{editedGame}"
			on:game="{onEditGame}"
			on:cancel="{onEditGameCancel}" />
	{/if}
	<div class="search-bar">
		<div>
			<button class="button-add green" on:click="{onNewGame}"><i class="material-icons">add</i></button>
		</div>
		<div>
			<label for="gameNameInput">Filter Games by Name:</label>
			<input id="gameNameInput" bind:value="{gameListFilter}" autocomplete="off" type="text" />
		</div>
		<div>
			<button class:grey={!gridVis} class:blue={gridVis} title="Switch to grid view" on:click="{onGridViewClick}">
				<i class="material-icons">widgets</i>
			</button>
			<button class="button-list" class:grey={!tableVis} class:blue={tableVis} title="Switch to table view" on:click="{onTableViewClick}">
				<i class="material-icons">list</i>
			</button>
		</div>
	</div>

	{#if tableVis}
		<div class="game-list-content">
			<table>
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
		<div class="game-list-content grid">
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
	.search-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 3em;
	}

	.game-list-page {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.game-list-content {
		flex: 1;
		overflow: auto;
		margin-left: 1em;
	}

	.grid {
		display: flex;
		flex-wrap: wrap;
	}

	.button-add {
		margin-left: 0.5em;
	}

	.button-list {
		margin-right: 0.5em;
	}

	.grey {
		background-color: gray;
		color: white;
	}

	.green {
		background-color: green;
		color: white;
	}

	.blue {
		background-color: blue;
		color: white;
	}

	button {
		border: none;
		text-align: center;
		align-content: center;
		text-decoration: none;
		display: inline-block;
		font-size: 36px;
		width: 3em;
	}
</style>
