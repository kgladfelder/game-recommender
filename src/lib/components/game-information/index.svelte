<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Genre, Platform, type Game, type ReleaseDates } from '$lib/types';

	export let id: string;
	export let createdDate: Date;
	export let gameName: string;
	export let mainStory: number | undefined;
	export let mainExtras: number | undefined;
	export let completionist: number | undefined;
	export let genres: number[] = [];
	export let platform: number | undefined;
	export let publisher: string | undefined;
	export let developer: string | undefined;
	export let releaseDates: ReleaseDates | undefined;
	export let visible: boolean;

	let box: HTMLDivElement;

	const dispatch = createEventDispatcher<{ game: Game; cancel: void }>();

	const cleanUp = () => {
		genres = [];
		if (box) {
			box.scrollTop = 0;
		}
	};

	const submitGame = async () => {
		const game: Game = {
			id: id,
			createdDate: createdDate,
			gameName,
			platform,
			mainStory,
			mainExtras,
			completionist,
			genres,
			publisher,
			developer,
			releaseDates,
		};
		// TODO Validation in modal
		dispatch('game', game);
		cleanUp();
	};

	const cancel = () => {
		dispatch('cancel');
		cleanUp();
	};

	const getGenres = () => {
		const keys = Object.values(Genre);
		const gs: { key: number; value: string }[] = [];

		for (let key of keys) {
			if (!isNaN(Number(key)) && Genre[Number(key)] !== 'Undefined') {
				gs.push({ key: Number(key), value: Genre[Number(key)] });
			}
		}
		return gs;
	};

	const getPlatforms = () => {
		const keys = Object.values(Platform);
		const ps: { key: number; value: string }[] = [];

		for (let key of keys) {
			if (!isNaN(Number(key)) && Platform[Number(key)] !== 'Unknown') {
				ps.push({ key: Number(key), value: Platform[Number(key)] });
			}
		}
		return ps;
	};
</script>

<div class:hidden-modal="{!visible}" class:modal="{visible}" on:click="{() => cancel()}">
	{#if visible}
		<div
			id="edit-modal"
			class="container"
			bind:this="{box}"
			on:click="{(event) => event.stopPropagation()}">
			<form class="row">
				<div class="col s12">
					<h6>Game Information:</h6>
				</div>
				<div class="input-field col s12">
					<label for="gameNameInput" class:active="{gameName}">Game Name</label>
					<input id="gameNameInput" bind:value="{gameName}" autocomplete="off" type="text" />
				</div>
				<div>
					<label for="platformInput" class="col s12">Platform</label>
					{#each getPlatforms() as pf}
						<label for="platform-{pf.value}" class="col s11 offset-s1 m3 offset-m1">
							<input
								id="platform-{pf.value}"
								bind:group="{platform}"
								type="radio"
								name="platformInput"
								value="{pf.key}" />
							<span>{pf.value}</span>
						</label>
					{/each}
				</div>
				<div class="input-field col s12 m6">
					<label for="developerInput" class:active="{developer}">Developer</label>
					<input id="developerInput" bind:value="{developer}" autocomplete="off" type="text" />
				</div>
				<div class="input-field col s12 m6">
					<label for="publisherInput" class:active="{publisher}">Publisher</label>
					<input id="publisherInput" bind:value="{publisher}" autocomplete="off" type="text" />
				</div>
				<div>
					<label for="genresInput" class="col s12">Genres</label>
					{#each getGenres() as gr}
						<label for="genres-{gr.value}" class="col s5 offset-s1 m3 offset-m1">
							<input
								id="genres-{gr.value}"
								type="checkbox"
								bind:group="{genres}"
								name="genres"
								value="{gr.key}" />
							<span>{gr.value}</span>
						</label>
					{/each}
				</div>
				<div class="col s12">
					<h6>Hours to Complete:</h6>
				</div>
				<div class="input-field col s12 m4">
					<label for="mainstoryInput" class:active="{mainStory}">Main Story</label>
					<input id="mainstoryInput" bind:value="{mainStory}" type="number" autocomplete="off" />
				</div>
				<div class="input-field  col s12 m4">
					<label for="mainextrasInput" class:active="{mainExtras}">Main Story + Extras</label>
					<input id="mainextrasInput" bind:value="{mainExtras}" type="number" autocomplete="off" />
				</div>
				<div class="input-field col s12 m4">
					<label for="completionistInput" class:active="{completionist}">Completionist</label>
					<input
						id="completionistInput"
						bind:value="{completionist}"
						type="number"
						autocomplete="off" />
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
						on:click|preventDefault="{submitGame}"
						class="waves-effect waves-light btn">
						Submit
					</button>
				</div>
			</form>
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
		overflow: auto;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
	}
</style>
