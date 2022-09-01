<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Genre, Platform, type Game } from '$lib/types';

	const dispatch = createEventDispatcher<{ complete: string; edit: string; delete: string }>();

	export let game: Game;
	export let displayEdit: boolean = true;

	let confirmDelete = false;

	let hoursArray: { hours: number | undefined; section: string }[] = [];
	let detailsArry: { detail: string | undefined; section: string }[] = [];

	$: hoursArray = [
		{
			hours: game.mainStory,
			section: 'Main Story',
		},
		{
			hours: game.mainExtras,
			section: 'Main Story + Extras',
		},
		{
			hours: game.completionist,
			section: 'Completionist',
		},
	];

	$: detailsArry = [
		{
			detail: fullPlatform,
			section: 'Platform',
		},
		{
			detail: fullDeveloper,
			section: 'Developer',
		},
		{
			detail: fullPublisher,
			section: 'Publisher',
		},
		{
			detail: fullGenres,
			section: 'Genres',
		},
	];

	let fullPlatform: string;
	$: fullPlatform = game.platform !== undefined ? Platform[game.platform] : 'Unknown';
	let fullPublisher: string;
	$: fullPublisher = game.publisher ?? '';
	let fullDeveloper: string;
	$: fullDeveloper = game.developer ?? '';
	let fullGenres: string;
	$: fullGenres = game.genres?.map((x) => Genre[x].toString()).join('\n') ?? 'Unkown';

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
</script>

<div class="card" class:completed="{game.completedDate !== undefined}">
	<h2>
		{game.gameName}
	</h2>
	{#if !confirmDelete}
		<div class="card-main">
			<h3>Hours:</h3>
			<ul>
				{#each hoursArray as ha}
					<li>
						<div class="game-info-desc">{ha.section}:</div>
						<div class="game-info">{ha.hours ?? ''}</div>
					</li>
				{/each}
			</ul>
			<h3>Details:</h3>
			<ul>
				{#each detailsArry as da}
					<li>
						<div class="game-info-desc">{da.section}</div>

						<div class="game-info">{da.detail}</div>
					</li>
				{/each}
			</ul>
		</div>
		{#if displayEdit}
			<div>
				<button
					title="{game.completedDate === undefined
						? 'Mark game complete.'
						: 'Mark game as still in progress.'}"
					on:click|preventDefault="{onCompleteGame}">
					<i class="material-icons">check</i>
				</button>
				<button title="Edit game" on:click|preventDefault="{onEditGame}">
					<i class="material-icons">edit</i>
				</button>
				<button title="Delete game from list" on:click|preventDefault="{onDelete}">
					<i class="material-icons">delete</i>
				</button>
			</div>
		{/if}
	{:else}
		<div>Confirm deletion of {game.gameName}</div>
		<div>
			<button on:click="{onCancel}"> Cancel </button>
			<button on:click="{raiseDelete}"> Delete </button>
		</div>
	{/if}
</div>

<style>
	h2 {
		font-size: larger;
		line-height: 1em;
	}
	h3 {
		font-size: normal;
		line-height: 0.5em;
	}

	ul {
		padding: 0px;
	}

	li {
		list-style: none;
		display: flex;
		line-height: 115%;
	}

	li div {
		display: inline-block;
		width: 10em;
		border-style: solid;
		border-width: 0px 0px 1px 0px;
		line-height: 1.5em;
	}

	button {
		border: none;
		text-align: center;
		align-content: center;
		text-decoration: none;
		display: inline-block;
		font-size: 18px;
	}

	.card {
		border-style: solid;
		border-width: 2px;
		padding: 0.5em;
		margin: 0.5em;
		width: 25em;
		min-height: 450px;
		max-height: 450px;
		display: flex;
		flex-direction: column;
	}

	.card-main {
		flex: 1;
	}

	.game-info-desc {
		font-weight: 400;
	}

	.game-info {
		font-weight: 700;
		white-space: pre;
		max-height: 6em;
		overflow: auto;
	}

	.completed {
		background-color: rgba(100, 250, 100);
	}
</style>
