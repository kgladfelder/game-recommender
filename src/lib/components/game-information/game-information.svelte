<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import dayjs from 'dayjs';

	import { Genre, Platform, type Game, type ReleaseDates } from '$lib/types';

	export let game: Game;
	export let visible: boolean;

	let box: HTMLDivElement;
	let format = 'YYYY-MM-DD';
	let localGame: Game = {...game};

	let internalDate: string | undefined;

	const input = (x: Date | undefined) => {
		if (x) {
			internalDate = dayjs(x).format(format);
		}
	};
	
	const output = (x: string | undefined) => {
		if (x) {
			localGame.completedDate = dayjs(x, format).toDate();
		}
	};

	$: input(localGame.completedDate);
	$: output(internalDate);


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
		dispatch('game', localGame);
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
			<div class="header">
				<div>
					<h1>{localGame.gameName}</h1>
				</div>
				<div>
					<button id="cancel-btn" class="red" on:click|preventDefault="{cancel}"> Cancel </button>
					<button id="submit-btn" class="green" on:click|preventDefault="{submitGame}">
						Submit
					</button>
				</div>
			</div>
			<form>
				<div>
					<label for="platformInput">Platform</label>
					<div class="options-grouping">
						{#each getPlatforms() as pf}
							<label for="platform-{pf.value}">
								<input
									id="platform-{pf.value}"
									bind:group="{localGame.platform}"
									type="radio"
									name="platformInput"
									value="{pf.key}" />
								<span>{pf.value}</span>
							</label>
						{/each}
					</div>
				</div>
				<div class="input-grouping">
					<label for="developerInput">Developer</label>
					<input
						id="developerInput"
						bind:value="{localGame.developer}"
						on:keypress="{checkForEnter}"
						autocomplete="off"
						type="text" />
				</div>
				<div class="input-grouping">
					<label for="publisherInput">Publisher</label>
					<input
						id="publisherInput"
						bind:value="{localGame.publisher}"
						on:keypress="{checkForEnter}"
						autocomplete="off"
						type="text" />
				</div>
				<div>
					<label for="genresInput">Genres</label>
					<div class="options-grouping">
						{#each getGenres() as gr}
							<label for="genres-{gr.value}">
								<input
									id="genres-{gr.value}"
									type="checkbox"
									bind:group="{localGame.genres}"
									name="genres"
									value="{gr.key}" />
								<span>{gr.value}</span>
							</label>
						{/each}
					</div>
				</div>
				<div>
					<h2>Hours to Complete:</h2>
				</div>
				<div class="input-grouping">
					<label for="mainstoryInput">Main Story</label>
					<input
						id="mainstoryInput"
						step="0.5"
						bind:value="{localGame.mainStory}"
						on:keypress="{checkForEnter}"
						type="number"
						autocomplete="off" />
				</div>
				<div class="input-grouping">
					<label for="mainextrasInput">Main Story + Extras</label>
					<input
						id="mainextrasInput"
						step="0.5"
						bind:value="{localGame.mainExtras}"
						on:keypress="{checkForEnter}"
						type="number"
						autocomplete="off" />
				</div>
				<div class="input-grouping">
					<label for="completionistInput">Completionist</label>
					<input
						id="completionistInput"
						step="0.5"
						bind:value="{localGame.completionist}"
						on:keypress="{checkForEnter}"
						type="number"
						autocomplete="off" />
				</div>
				<div class="input-grouping">
					<label for="completionDate">Completed Date</label>
					<input id="completionDate" type="date" bind:value="{internalDate}" />
				</div>
			</form>
		</div>
	{/if}
</div>

<style>
	.hidden-modal {
		display: none;
	}

	.modal {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: 75;
		left: 0;
		width: 100%;
		overflow: hidden;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
		height: calc(100% - 80px);
	}

	.container {
		display: flex;
		flex-direction: column;
		background-color: rgb(255, 255, 255);
		background-color: rgba(255, 255, 255, 1);
		height: 80%;
		width: 80%;
		padding: 1.25em;
		overflow: hidden;
	}

	.red {
		background-color: red;
		color: white;
	}

	.green {
		background-color: green;
		color: white;
	}

	.options-grouping {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		font-size: 20px;
	}

	.options-grouping label {
		width: 30%;
	}

	.input-grouping {
		display: flex;
		flex-direction: column;
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	label {
		width: 100%;
		font-size: larger;
	}

	button {
		border: none;
		text-align: center;
		align-content: center;
		text-decoration: none;
		margin-top: 1em;
		font-size: 24px;
	}

	form {
		flex: 1;
		overflow: auto;
	}

	input:focus {
		outline: none;
	}

	input[type='checkbox'],
	input[type='radio'] {
		width: 1em;
		height: 1em;
		margin-top: 0.25em;
		vertical-align: top;
		background-color: #fff;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		border: 1px solid rgba(0, 0, 0, 0.25);
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		-webkit-print-color-adjust: exact;
		color-adjust: exact;
		/* float: left; */
		/* margin-left: -1.5em; */
	}

	input[type='radio'] {
		border-radius: 50%;
	}

	input[type='checkbox']:checked,
	input[type='radio']:checked {
		background-color: #0d6efd;
		border-color: #163c75;
	}

	input[type='text'] {
		border: none;
		border-bottom: 0.125rem solid;
		width: 50%;
		height: 2rem;
		font-size: 1.5rem;
		padding-left: 0.875rem;
		line-height: 147.6%;
		padding-top: 0.825rem;
		padding-bottom: 0.5rem;
	}

	input[type='date'] {
		border: none;
		border-bottom: 0.125rem solid;
		width: 50%;
		height: 2rem;
		font-size: 1.5rem;
		padding-left: 0.875rem;
		line-height: 147.6%;
		padding-top: 0.825rem;
		padding-bottom: 0.5rem;
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
		border: none;
		border-bottom: 0.125rem solid;
		width: 50%;
		height: 2rem;
		font-size: 1.5rem;
		padding-left: 0.875rem;
		line-height: 147.6%;
		padding-top: 0.825rem;
		padding-bottom: 0.5rem;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
