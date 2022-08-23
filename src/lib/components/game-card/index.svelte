<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Genre, Platform, type Game } from '$lib/types';

	const dispatch = createEventDispatcher<{ complete: string; edit: string; delete: string }>();

	export let game: Game;

	let confirmDelete = false;

	let fullPlatform: string;
	$: fullPlatform = game.platform !== undefined ? Platform[game.platform] : 'Unknown';
	let fullPublisher: string;
	$: fullPublisher = game.publisher ?? '';
	let fullDeveloper: string;
	$: fullDeveloper = game.developer ?? '';
	let fullGenres: string;
	$: fullGenres = game.genres?.map((x) => Genre[x].toString()).join('\n') ?? 'Unkown';

	let displayPlatform: string;
	$: {
		if (fullPlatform.length > 18) {
			displayPlatform = fullPlatform.slice(0, 15) + '...';
		} else {
			displayPlatform = fullPlatform;
		}
	}
	let displayPublisher: string;
	$: {
		if (fullPublisher.length > 18) {
			displayPublisher = fullPublisher.slice(0, 15) + '...';
		} else {
			displayPublisher = fullPublisher;
		}
	}
	let displayDeveloper: string;
	$: {
		if (fullDeveloper.length > 18) {
			displayDeveloper = fullDeveloper.slice(0, 15) + '...';
		} else {
			displayDeveloper = fullDeveloper;
		}
	}
	let displayGenres: string;
	$: {
		if (game.genres && game.genres?.length > 5) {
			displayGenres = game.genres
				.slice(0, 5)
				.map((x) => Genre[x].toString())
				.join('\n');
		} else {
			displayGenres = fullGenres;
		}
	}

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

<div class="col s6 m4 l3">
	<div class="card medium" class:completed-game="{game.completedDate !== undefined}">
		<div class="card-title blue lighten-4 ctr">{game.gameName}</div>
		{#if !confirmDelete}
			<div class="card-content">
				<div class="row">
					<div class="col s4">
						<div class="hours">{game.mainStory}</div>
						<div class="hours-desc">Main Story</div>
					</div>
					<div class="col s4">
						<div class="hours">{game.mainExtras}</div>
						<div class="hours-desc">Main Story + Extras</div>
					</div>
					<div class="col s4">
						<div class="hours">{game.completionist}</div>
						<div class="hours-desc">Completionist</div>
					</div>
				</div>
				<div class="row">
					<div>
						<span class="col s3 grey-text text-darken-1 label">Platform:</span>
						{#if displayPlatform !== fullPlatform}
							<span class="col s9 info-box">
								{displayPlatform}
								<span class="tooltip">
									{fullPlatform}
								</span>
							</span>
						{:else}
							<span class="col s9">{fullPlatform}</span>
						{/if}
					</div>
					<div>
						<span class="col s3 grey-text text-darken-1 label">Publisher:</span>
						{#if displayPublisher !== fullPublisher}
							<span class="col s9 info-box">
								{displayPublisher}
								<span class="tooltip">
									{fullPublisher}
								</span>
							</span>
						{:else}
							<span class="col s9">{fullPublisher}</span>
						{/if}
					</div>
					<div>
						<span class="col s3 grey-text text-darken-1 label">Developer:</span>
						{#if displayDeveloper !== fullDeveloper}
							<span class="col s9 info-box">
								{displayDeveloper}
								<span class="tooltip">
									{fullDeveloper}
								</span>
							</span>
						{:else}
							<span class="col s9">{fullDeveloper}</span>
						{/if}
					</div>
					<div>
						<span class="col s3 grey-text text-darken-1 label">Genres:</span>
						<span class="col s9 info-box-long">{fullGenres}</span>
					</div>
				</div>
			</div>
			<div class="card-action">
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
			</div>
		{:else}
			<div class="flow-text confirm-delete">Confirm deletion of {game.gameName}</div>
			<div class="stack-box">
				<button class="waves-effect waves-light blue lighten-2 btn col s12" on:click="{onCancel}">
					Cancel
				</button>
				<button class="waves-effect waves-light red lighten-2 btn col s12" on:click="{raiseDelete}">
					Delete
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.action-btn {
		width: 30%;
	}

	.card-action {
		padding: 16px;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.card-title {
		padding-left: 0.5em;
	}

	.confirm-delete {
		margin: 0.5em;
	}

	.completed-game {
		color: rgb(100, 100, 100);
		background-color: rgb(200, 200, 200);
	}

	.ctr {
		text-align: center;
	}

	.hours {
		font-size: xx-large;
		text-align: center;
	}

	.hours-desc {
		font-size: smaller;
		text-align: center;
	}

	.info-box {
		position: relative;
		display: inline-block;
		height: 1.5em;
	}

	.info-box .tooltip {
		visibility: collapse;
	}

	.info-box:hover .tooltip {
		visibility: visible;
		width: 100%;
		background-color: rgb(100, 100, 100);
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;

		position: absolute;
		z-index: 1;
		bottom: 100%;
		left: 50%;
		margin-left: -50%;
	}

	.info-box-long {
		white-space: pre;
		overflow: auto;
		max-height: 7.5em;
	}

	.label {
		font-size: smaller;
	}

	.stack-box {
		display: flex;
		height: 15em;
		flex-direction: column;
		justify-content: space-evenly;
	}
</style>
