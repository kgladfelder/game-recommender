<script lang="ts">
	import { modalStore } from "@skeletonlabs/skeleton";
	import { textFieldInvalid, numberFieldInvalid, dateFieldInvalid } from "$lib/utils";
	import type { Developer, Genre, Publisher, System } from "@prisma/client";

	let newGame = "";
	let main: number = 0;
	let extras: number = 0;
	let completionsist: number = 0;
	let usReleaseDate: Date;
	let euReleaseDate: Date;
	let jpReleaseDate: Date;

	let publishers: Publisher[];
	let selectedPublisher: Publisher;
	let developers: Developer[];
	let selectedDeveloper: Developer;
	let systems: System[];
	let selectedSystems: System[] = [];
	let genres: Genre[];
	let selectedGenres: Genre[] = [];

	let invalid: boolean;

	if ($modalStore[0] && $modalStore[0].meta.publishers) {
		publishers = $modalStore[0].meta.publishers;
	}
	if ($modalStore[0] && $modalStore[0].meta.developers) {
		developers = $modalStore[0].meta.developers;
	}
	if ($modalStore[0] && $modalStore[0].meta.systems) {
		systems = $modalStore[0].meta.systems;
	}
	if ($modalStore[0] && $modalStore[0].meta.genres) {
		genres = $modalStore[0].meta.genres;
	}

	const checkDisabled = (newGame: string) => {
		invalid =
			textFieldInvalid(newGame) ||
			numberFieldInvalid(main) ||
			numberFieldInvalid(extras) ||
			numberFieldInvalid(completionsist) ||
			dateFieldInvalid(usReleaseDate) ||
			dateFieldInvalid(jpReleaseDate) ||
			dateFieldInvalid(euReleaseDate) ||
			selectedPublisher === undefined ||
			selectedDeveloper === undefined ||
			selectedSystems.length === 0 ||
			selectedGenres.length === 0;
		return invalid;
	};
</script>

<div class="card w-4/5 p-4 shadow-xl space-y-4">
	<form method="POST" action="?/create">
		<label class="label p-2">
			<span>Game Name</span>
			<input
				class="input variant-form-material"
				name="gameName"
				id="gameName"
				placeholder="Game"
				bind:value="{newGame}"
				type="text"
				required />
		</label>
		<div class="flex flex-row">
			<label class="label w-1/3 p-2">
				<span>Main Story Length</span>
				<input
					class="input variant-form-material"
					name="main"
					id="main"
					placeholder="Main Story"
					bind:value="{main}"
					type="number"
					min="0" />
			</label>
			<label class="label w-1/3 p-2">
				<span>Main Story + Extras Length</span>
				<input
					class="input variant-form-material"
					name="extras"
					id="extras"
					placeholder="Main + Extras"
					bind:value="{extras}"
					type="number"
					min="0" />
			</label>
			<label class="label w-1/3 p-2">
				<span>Completionist Length</span>
				<input
					class="input variant-form-material"
					name="completionist"
					id="completionsist"
					placeholder="Completionist"
					bind:value="{completionsist}"
					type="number"
					min="0" />
			</label>
		</div>
		<div class="flex flex-row">
			<label class="label w-1/3 p-2">
				<span>USA Release Date</span>
				<input
					class="input variant-form-material"
					name="usReleaseDate"
					id="usReleaseDate"
					placeholder="US Release"
					bind:value="{usReleaseDate}"
					type="date"
					required />
			</label>
			<label class="label w-1/3 p-2">
				<span>European Release Date</span>
				<input
					class="input variant-form-material"
					name="euReleaseDate"
					id="euReleaseDate"
					placeholder="EU Release"
					bind:value="{euReleaseDate}"
					type="date"
					required />
			</label>
			<label class="label w-1/3 p-2">
				<span>Japanese Release Date</span>
				<input
					class="input variant-form-material"
					name="jpReleaseDate"
					id="jpReleaseDate"
					placeholder="Japanese Release"
					bind:value="{jpReleaseDate}"
					type="date"
					required />
			</label>
		</div>
		<div class="flex flex-row">
			{#if publishers}
				<label class="label w-1/2 p-2">
					<span>Publisher</span>
					<select
						class="input variant-form-material"
						name="publisher"
						id="publisher"
						bind:value="{selectedPublisher}"
						required>
						{#each publishers as publisher (publisher.id)}
							<option value="{publisher.id}">{publisher.name}</option>
						{/each}
					</select>
				</label>
			{:else}
				<span>No Publishers exist, please add some before creating a game.</span>
			{/if}
			{#if developers}
				<label class="label w-1/2 p-2">
					<span>Developer</span>
					<select
						class="input variant-form-material"
						name="developer"
						id="developer"
						bind:value="{selectedDeveloper}"
						required>
						{#each developers as developer (developer.id)}
							<option value="{developer.id}">{developer.name}</option>
						{/each}
					</select>
				</label>
			{:else}
				<span>No Developers exist, please add some before creating a game.</span>
			{/if}
		</div>
		<div class="flex flex-row">
			{#if systems}
				<label class="label w-1/2 p-2">
					<span>Systems</span>
					<select
						multiple
						class="input variant-form-material"
						name="systems"
						id="systems"
						bind:value="{selectedSystems}"
						required>
						{#each systems as system (system.id)}
							<option value="{system.id}">{system.name}</option>
						{/each}
					</select>
				</label>
			{:else}
				<span>No Systems exist, please add some before creating a game.</span>
			{/if}
			{#if genres}
				<label class="label w-1/2 p-2">
					<span>Genres</span>
					<select
						multiple
						class="input variant-form-material"
						name="genres"
						id="genres"
						bind:value="{selectedGenres}"
						required>
						{#each genres as genre (genre.id)}
							<option value="{genre.id}">{genre.name}</option>
						{/each}
					</select>
				</label>
			{:else}
				<span>No Genres exist, please add some before creating a game.</span>
			{/if}
		</div>
		<button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newGame)}">
			Add Game
		</button>
	</form>
</div>
