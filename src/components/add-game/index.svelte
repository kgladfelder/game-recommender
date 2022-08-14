<script lang="ts">
	import { v4 } from 'uuid';
	import { createEventDispatcher } from 'svelte';

	import { Genre, Platform, type Game } from '../../types';
	let box: HTMLDivElement;
	let gameName: string = '';
	let platform: string = '';
	let mainStory: number | undefined;
	let mainExtras: number | undefined;
	let completionist: number | undefined;
	let genres: string[] = [];
	let publisher: string = '';
	let developer: string = '';
	let newGame: Game | undefined = undefined;
	export let visible: boolean;
	const dispatch = createEventDispatcher<{ newGame: Game; cancel: void }>();

	const cleanUp = () => {
		gameName = '';
		platform = '';
		mainStory = undefined;
		mainExtras = undefined;
		completionist = undefined;
		genres = [];
		publisher = '';
		developer = '';
		newGame = undefined;
		box.scrollTop = 0;
	};

	const addGame = () => {
		newGame = {
			id: v4(),
			createdDate: new Date(),
			gameName,
			platform: stringToPlatform(platform),
			mainStory,
			mainExtras,
			completionist,
			genres: genres.map(stringToGenre),
			publisher,
			developer
		};
		// TODO Validation in modal
		dispatch('newGame', newGame);
		cleanUp();
	};

	const cancel = () => {
		dispatch('cancel');
		cleanUp();
	};

	const stringToGenre = (str: string): Genre => {
		let genreName = str.trim();
		const genre = Genre[genreName as keyof typeof Genre];
		if (genre >= 0) {
			return genre;
		}
		return Genre.Undefined;
	};

	const stringToPlatform = (str: string): Platform => {
		console.log(str);
		let platformName = str.trim();
		const pf = Platform[platformName as keyof typeof Platform];
		if (pf >= 0) {
			return pf;
		}
		return Platform.Unknown;
	};
</script>

<div class:hidden-modal={!visible} class:modal={visible}>
	<div class="container form-content" bind:this={box}>
		<h5 class="row">Add New Game:</h5>
		<form class="row">
			<div>
				<label for="gameNameInput" class="col s12">Game Name</label>
				<input id="gameNameInput" bind:value={gameName} class="col s12" />
			</div>
			<div>
				<label for="platformInput" class="col s12">Platform</label>
				{#each Object.keys(Platform).filter((x) => isNaN(parseInt(x)) && x !== 'Unknown') as platformItem}
					<label class="col s11 offset-s1">
						<input bind:group={platform} type="radio" name="platformInput" value={platformItem} />
						<span>{platformItem}</span>
					</label>
				{/each}
			</div>
			<div>
				<label for="mainstoryInput" class="col s12">Main Story:</label>
				<input
					id="mainstoryInput"
					bind:value={mainStory}
					type="number"
					autocomplete="off"
					class="col s12"
				/>
			</div>
			<div>
				<label for="mainextrasInput" class="col s12">Main Story + Extras</label>
				<input
					id="mainextrasInput"
					bind:value={mainExtras}
					type="number"
					autocomplete="off"
					class="col s12"
				/>
			</div>
			<div>
				<label for="completionistInput" class="col s12">Completionist</label>
				<input
					id="completionistInput"
					bind:value={completionist}
					type="number"
					autocomplete="off"
					class="col s12"
				/>
			</div>
			<div>
				<label for="genresInput" class="col s12">Genres</label>
				{#each Object.keys(Genre).filter((x) => isNaN(parseInt(x)) && x !== 'Undefined') as genreItem}
					<div class="col s5 offset-s1 m3 offset-m1">
						<label>
							<input type="checkbox" bind:group={genres} name="genres" value={genreItem} />
							<span>{genreItem}</span>
						</label>
					</div>
				{/each}
			</div>
			<div>
				<label for="publisherInput" class="col s12">Publisher</label>
				<input id="publisherInput" bind:value={publisher} autocomplete="off" class="col s12" />
			</div>
			<div>
				<label for="developerInput" class="col s12">Developer</label>
				<input id="developerInput" bind:value={developer} autocomplete="off" class="col s12" />
			</div>
			<div class="col s2 offset-s10">
				<button on:click|preventDefault={cancel} class="waves-effect waves-light red lighten-2 btn">
					Cancel
				</button>
				<button on:click|preventDefault={addGame} class="waves-effect waves-light btn">
					Add
				</button>
			</div>
		</form>
	</div>
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
