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

<tr class:completed-game="{game.completedDate !== undefined}">
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
			<button title="Mark game complete" on:click|preventDefault="{onCompleteGame}">
				<i class="material-icons">check</i>
			</button>
			<button title="Edit game" on:click|preventDefault="{onEditGame}">
				<i class="material-icons">edit</i>
			</button>
			<button title="Delete game from list" on:click|preventDefault="{onDelete}">
				<i class="material-icons">delete</i>
			</button>
		{:else}
			<button on:click="{onCancel}"> Cancel </button>
			<button on:click="{raiseDelete}"> Delete </button>
		{/if}
	</td>
</tr>

<style>
	.completed-game {
		background-color: rgba(100,250,100);
	}
</style>
