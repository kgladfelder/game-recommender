<script lang="ts">
	import { v4 } from 'uuid';
	import { createEventDispatcher } from 'svelte';

	import { Genre, Platform, type Game } from '../../types';

	export let gameName: string = '';
	export let mainStory: number | undefined = undefined;
	export let mainExtras: number | undefined = undefined;
	export let completionist: number | undefined = undefined;
	export let genres: number[] = [];
	export let platform: number | undefined = undefined;
	export let publisher: string = '';
	export let developer: string = '';
	export let visible: boolean;

	let box: HTMLDivElement;

	const dispatch = createEventDispatcher<{ game: Game; cancel: void }>();

	const cleanUp = () => {
		gameName = '';
		platform = undefined;
		mainStory = undefined;
		mainExtras = undefined;
		completionist = undefined;
		genres = [];
		publisher = '';
		developer = '';
		box.scrollTop = 0;
	};

	const submitGame = () => {
		const game: Game = {
			id: v4(),
			createdDate: new Date(),
			gameName,
			platform,
			mainStory,
			mainExtras,
			completionist,
			genres,
			publisher,
			developer
		};
		// TODO Validation in modal
		dispatch('game', game);
		cleanUp();
	};

	const cancel = () => {
		dispatch('cancel');
		cleanUp();
	};
</script>

<div class:hidden-modal={!visible} class:modal={visible}>
	{#if visible}
	<div class="container" bind:this={box}>
		<form class="row">
			<div class="col s12">
				<h6>Game Information:</h6>
			</div>
			<div class="input-field col s12">
				<label for="gameNameInput" class:active={gameName}>Game Name</label>
				<input id="gameNameInput" bind:value={gameName} type="text" />
			</div>
			<div>
				<label for="platformInput" class="col s12">Platform</label>
				{#each Object.entries(Platform) as [key, value]}
					{#if isNaN(parseInt(key)) && key !== "Unknown"}
					<label class="col s11 offset-s1 m3 offset-m1">
						<input bind:group={platform} type="radio" name="platformInput" value={value} />
						<span>{key}</span>
					</label>
					{/if}
				{/each}
			</div>
			<div class="input-field col s12 m6">
				<label for="developerInput" class:active={developer}>Developer</label>
				<input id="developerInput" bind:value={developer} autocomplete="off" type="text" />
			</div>
			<div class="input-field col s12 m6">
				<label for="publisherInput" class:active={publisher}>Publisher</label>
				<input id="publisherInput" bind:value={publisher} autocomplete="off" type="text" />
			</div>
			<div>
				<label for="genresInput" class="col s12">Genres</label>
				{#each Object.entries(Genre) as [key, value]}
					{#if isNaN(parseInt(key)) && key !== "Unknown"}
					<div class="col s5 offset-s1 m3 offset-m1">
						<label>
							<input type="checkbox" bind:group={genres} name="genres" value={value} />
							<span>{key}</span>
						</label>
					</div>
					{/if}
				{/each}
			</div>
			<div class="col s12">
				<h6>Hours to Complete:</h6>
			</div>
			<div class="input-field col s12 m4">
				<label for="mainstoryInput" class:active={mainStory}>Main Story:</label>
				<input id="mainstoryInput" bind:value={mainStory} type="number" autocomplete="off" />
			</div>
			<div class="input-field  col s12 m4">
				<label for="mainextrasInput" class:active={mainExtras}>Main Story + Extras</label>
				<input id="mainextrasInput" bind:value={mainExtras} type="number" autocomplete="off" />
			</div>
			<div class="input-field col s12 m4">
				<label for="completionistInput" class:active={completionist}>Completionist</label>
				<input
					id="completionistInput"
					bind:value={completionist}
					type="number"
					autocomplete="off"
				/>
			</div>
			<div class="col s2 offset-s10">
				<button on:click|preventDefault={cancel} class="waves-effect waves-light red lighten-2 btn">
					Cancel
				</button>
				<button on:click|preventDefault={submitGame} class="waves-effect waves-light btn">
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
