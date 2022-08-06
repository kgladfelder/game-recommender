<script lang="ts">
	import { Genre, Platform, type Game } from '../../types';
	import { gameStore } from '../../stores';

	let confDelVis: Boolean = false;
	let confDelGameId: string | undefined;

	const setLocalStorage = () => {
		localStorage.setItem('games', JSON.stringify($gameStore));
	};

	const editGame = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		console.log(ind);
		// TODO: Edit Modal
		return null;
	};

	const removeGame = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		confDelGameId = id;
		// if (ind > -1) {
		// 	$gameStore.splice(ind, 1);
		// 	$gameStore = $gameStore;
		// 	setLocalStorage();
		// }
		confDelVis = true;
		return null;
	};

	const clearDelete = () => {
		confDelVis = false;
		confDelGameId = undefined;
	};

	const confirmDelete = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		console.log(ind);
		// if (ind > -1) {
		// 	$gameStore.splice(ind, 1);
		// 	$gameStore = $gameStore;
		// 	setLocalStorage();
		// }
		confDelVis = false;
		confDelGameId = undefined;
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

	const addGame = () => {
		// https://svelte-modals.mattjennings.io/
		// https://github.com/mattjennings/svelte-modals/issues
		// show('/add-game');
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		});
	};

	// Possible data table replacement
	// https://github.com/Kiho/svelte-datatable
	// https://madewithsvelte.com/svelte-materialize-datatable
</script>

<div class="row">
	<div class="col s1" />
	<table class="col s10">
		<thead>
			<tr>
				<th>Completed</th>
				<th>Game Name</th>
				<th>Platform</th>
				<th>Genres</th>
				<th>Main Story</th>
				<th>Main + Extras</th>
				<th>Completionist</th>
				<th>Developer</th>
				<th>Publisher</th>
				<th>Date Added</th>
				<th>
					<button on:click={addGame} class="waves-effect waves-light btn btn-width">Add Game</button
					>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each $gameStore as game}
				<tr class={game.completedDate === undefined ? 'row' : 'strike'}>
					<td>
						<button
							on:click={completeGame(game.id)}
							class={game.completedDate === undefined
								? 'waves-effect waves-light blue lighten-2 btn'
								: 'waves-effect waves-dark grey lighten-2 black-text btn'}
						>
							{game.completedDate === undefined ? 'Complete' : 'Continue'}
						</button>
					</td>
					<td>{game.gameName}</td>
					<td>{game.platform !== undefined ? Platform[game.platform] : 'Unknown'}</td>
					<td>{game.genres?.map((x) => Genre[x].toString()).join(', ') ?? 'Unkown'}</td>
					<td>{game.mainStory ?? 'Unknown'}</td>
					<td>{game.mainExtras ?? 'Unknown'}</td>
					<td>{game.completionist ?? 'Unknown'}</td>
					<td>{game.developer ?? 'Unknown'}</td>
					<td>{game.publisher ?? 'Unknown'}</td>
					<td>{formatDate(game.createdDate)}</td>
					<td>
						{#if !confDelVis}
							<button
								on:click={() => editGame(game.id)}
								class="waves-effect waves-light btn btn-half-width"
							>
								Edit
							</button>
							<button
								on:click={() => removeGame(game.id)}
								class="waves-effect waves-light red lighten-2 btn btn-half-width"
							>
								Delete
							</button>
						{/if}
						{#if confDelVis && game.id === confDelGameId}
							<button
								on:click={() => clearDelete()}
								class="waves-effect waves-light btn btn-half-width"
							>
								Cancel
							</button>
							<button
								on:click={() => confirmDelete(game.id)}
								class="waves-effect waves-light red lighten-2 btn btn-half-width"
							>
								Delete
							</button>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="col s1" />
</div>

<style>
	.strike {
		text-decoration: line-through;
	}

	.row {
		text-decoration: none;
	}

	.btn-width {
		width: 12em;
	}

	.btn-half-width {
		width: 5.75em;
	}
</style>
