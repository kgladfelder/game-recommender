<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Genre, Platform, type Game } from '$lib/types';

	export let game: Game;

	let confirmDelete = false;

	const dispatch = createEventDispatcher<{ complete: string; edit: string; delete: string }>();

	const onCompleteGame = () => {
		dispatch('complete', game.id);
	};

	const onEditGame = () => {
		dispatch('edit', game.id);
	};

	const onDelete = () => {
		confirmDelete = true;
	};

	const onCancel = () => {
		confirmDelete = false;
	};

	const raiseDelete = () => {
		dispatch('delete', game.id);
	};

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: '2-digit',
		});
	};
</script>

<tr class="row" class:completed-game="{game.completedDate !== undefined}">
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
		{#if !confirmDelete}
			<button
				class="waves-effect waves-light green lighten-2 btn action-btn"
				title="Mark game complete"
				on:click|preventDefault="{onCompleteGame}">
				<i class="material-icons">check</i>
			</button>
			<button
				class="waves-effect waves-light blue lighten-2 btn action-btn"
				title="Edit game"
				on:click|preventDefault="{onEditGame}">
				<i class="material-icons">edit</i>
			</button>
			<button
				class="waves-effect waves-light red lighten-2 btn action-btn"
				title="Delete game from list"
				on:click|preventDefault="{onDelete}">
				<i class="material-icons">delete</i>
			</button>
		{:else}
			<button on:click="{onCancel}" class="waves-effect waves-light btn btn-half-width">
				Cancel
			</button>
			<button
				on:click="{raiseDelete}"
				class="waves-effect waves-light red lighten-2 btn btn-half-width">
				Delete
			</button>
		{/if}
	</td>
</tr>

<style>
	.btn-half-width {
		width: 5.75em;
	}

	.completed-game {
		color: rgb(100,100,100);
        background-color: rgb(200,200,200);
	}
</style>
