<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { Genre, Platform, type Game, type ReleaseDates } from '$lib/types';

	export let game: Game;
	export let visible: boolean;

	let box: HTMLDivElement;

	const dispatch = createEventDispatcher<{ game: Game; cancel: void }>();

	const checkForEnter = async (key: KeyboardEvent) => {
		if (key.key === 'Enter') {
			key.preventDefault();
		}
	};

	const cleanUp = () => {
		if (box) {
			box.scrollTop = 0;
		}
	};

	const submitGame = () => {
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
			<form>
				<div>
					<h6>{game.gameName}</h6>
				</div>
				<div>
					<label for="platformInput">Platform</label>
					{#each getPlatforms() as pf}
						<label for="platform-{pf.value}">
							<input
								id="platform-{pf.value}"
								bind:group="{game.platform}"
								type="radio"
								name="platformInput"
								value="{pf.key}" />
							<span>{pf.value}</span>
						</label>
					{/each}
				</div>
				<div>
					<label for="developerInput">Developer</label>
					<input id="developerInput" bind:value="{game.developer}" on:keypress="{checkForEnter}" autocomplete="off" type="text" />
				</div>
				<div>
					<label for="publisherInput">Publisher</label>
					<input id="publisherInput" bind:value="{game.publisher}" on:keypress="{checkForEnter}" autocomplete="off" type="text" />
				</div>
				<div>
					<label for="genresInput">Genres</label>
					{#each getGenres() as gr}
						<label for="genres-{gr.value}">
							<input
								id="genres-{gr.value}"
								type="checkbox"
								bind:group="{game.genres}"
								name="genres"
								value="{gr.key}" />
							<span>{gr.value}</span>
						</label>
					{/each}
				</div>
				<div>
					<h6>Hours to Complete:</h6>
				</div>
				<div>
					<label for="mainstoryInput">Main Story</label>
					<input id="mainstoryInput" bind:value="{game.mainStory}" on:keypress="{checkForEnter}" type="number" autocomplete="off" />
				</div>
				<div>
					<label for="mainextrasInput">Main Story + Extras</label>
					<input id="mainextrasInput" bind:value="{game.mainExtras}" on:keypress="{checkForEnter}" type="number" autocomplete="off" />
				</div>
				<div>
					<label for="completionistInput">Completionist</label>
					<input
						id="completionistInput"
						bind:value="{game.completionist}"
						on:keypress="{checkForEnter}"
						type="number"
						autocomplete="off" />
				</div>
				<div>
					<button
						id="cancel-btn"
						on:click|preventDefault="{cancel}">
						Cancel
					</button>
					<button
						id="submit-btn"
						on:click|preventDefault="{submitGame}">
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
		position: fixed;
		z-index: 75;
		left: 0;
		width: 100%;
		overflow: hidden;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
		height: calc(100% - 80px);
	}

	.hidden-modal {
		display: none;
	}

	.container {
		background-color: rgb(255, 255, 255);
		background-color: rgba(255, 255, 255, 1);
		height: 100%;
		width: 75%;
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
