<script lang="ts">
	import { v4 } from 'uuid';
	import { goto } from '$app/navigation';

	import { Genre, Platform, type Game } from '../../types';
	import { gameStore } from '../../stores';

	const setLocalStorage = () => {
		localStorage.setItem('games', JSON.stringify($gameStore));
	};

	let gameName: string = '';
	let platform: string = '';
	let mainStory: number | undefined;
	let mainExtras: number | undefined;
	let completionist: number | undefined;
	let genres: string[] = [];
	let publisher: string = '';
	let developer: string = '';

	const addGame = () => {
		const g: Game = {
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
		if (
			gameName &&
			platform &&
			mainStory &&
			mainExtras &&
			completionist &&
			genres &&
			publisher &&
			developer
		) {
			$gameStore = [...$gameStore, g];
			gameName = '';
			setLocalStorage();
			goto('/game-list');
		}
	};

	const cancel = () => {
		goto('/game-list');
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
		let platformName = str.trim();
		const pf = Platform[platformName as keyof typeof Platform];
		if (pf >= 0) {
			return pf;
		}
		return Platform.Unknown;
	};
</script>

<div>
	<form>
		<label for="gameNameInput">Game Name:</label>
		<input name="gameNameInput" bind:value={gameName} />
		<br />
		<label for="platformInput">Platform:</label>
		<select name="platformInput" bind:value={platform}>
			{#each Object.keys(Platform).filter((x) => isNaN(parseInt(x)) && x !== 'Unknown') as platform}
				<option value={platform}>{platform}</option>
			{/each}
		</select>
		<br />
		<label for="mainstoryInput">Main Story:</label>
		<input name="mainstoryInput" bind:value={mainStory} type="number" />
		<br />
		<label for="mainextrasInput">Main + Extras:</label>
		<input name="mainextrasInput" bind:value={mainExtras} type="number" />
		<br />
		<label for="completionistInput">Completionist</label>
		<input name="completionistInput" bind:value={completionist} type="number" />
		<br />
		<label for="genresInput">Genres</label>
		<select name="genresInput" bind:value={genres} multiple>
			{#each Object.keys(Genre).filter((x) => isNaN(parseInt(x)) && x !== 'Undefined') as genre}
				<option value={genre}>{genre}</option>
			{/each}
		</select>
		<br />
		<label for="publisherInput">Publisher</label>
		<input name="publisherInput" bind:value={publisher} />
		<br />
		<label for="developerInput">Developer</label>
		<input name="developerInput" bind:value={developer} />
		<br />
		<button on:click|preventDefault={addGame}>Add</button>
		<button on:click|preventDefault={cancel}>Cancel</button>
	</form>
</div>
