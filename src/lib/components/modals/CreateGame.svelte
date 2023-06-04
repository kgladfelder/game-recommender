<script lang="ts">
	import { modalStore } from "@skeletonlabs/skeleton";
	import { fieldInvalid } from "$lib/utils";
	import type { Developer, Genre, Publisher, System } from "@prisma/client";

	let newGame = "";
	let main: number = 0;
	let extras: number = 0;
	let completionsist: number = 0;
	let invalid: boolean;
    let usReleaseDate: Date;
    let euReleaseDate: Date;
    let jpReleaseDate: Date;

    let publishers: Publisher[];
    let developers: Developer[];
    let systems: System[];
    let genres: Genre[];

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
		invalid = fieldInvalid(newGame);
		return invalid;
	};
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
	<form method="POST" action="?/create">
		<label class="label">
			<span>Game Name</span>
			<input
				class="input"
				name="gameName"
				id="gameName"
				placeholder="Game"
				bind:value="{newGame}"
				type="text"
				required />
		</label>
		<label class="label">
			<span>Main Story Length</span>
			<input
				class="input"
				name="main"
				id="main"
				placeholder="Main Story"
				bind:value="{main}"
				type="number"
				min="0" />
		</label>
		<label class="label">
			<span>Main Story + Extras Length</span>
			<input
				class="input"
				name="extras"
				id="extras"
				placeholder="Main + Extras"
				bind:value="{extras}"
				type="number"
                min="0" />
		</label>
		<label class="label">
			<span>Completionist Length</span>
			<input
				class="input"
				name="completionist"
				id="completionsist"
				placeholder="Completionist"
				bind:value="{completionsist}"
				type="number"
                min="0" />
		</label>
		<label class="label">
			<span>USA Release Date</span>
			<input
				class="input"
				name="usReleaseDate"
				id="usReleaseDate"
				placeholder="US Release"
				bind:value="{usReleaseDate}"
				type="date"
				required />
		</label>
		<label class="label">
			<span>European Release Date</span>
			<input
				class="input"
				name="euReleaseDate"
				id="euReleaseDate"
				placeholder="EU Release"
				bind:value="{euReleaseDate}"
				type="date"
				required />
		</label>
		<label class="label">
			<span>Japanese Release Date</span>
			<input
				class="input"
				name="jpReleaseDate"
				id="jpReleaseDate"
				placeholder="Japanese Release"
				bind:value="{jpReleaseDate}"
				type="date"
				required />
		</label>
		<div>TODO: Publisher</div>
        <div>TODO: Developer</div>
        <div>TODO: Systems</div>
        <div>TODO: Genres</div>

		<button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newGame)}">
            Add Game
        </button>
	</form>
</div>
