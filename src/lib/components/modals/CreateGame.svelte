<script lang="ts">
	import { fieldInvalid } from "$lib/utils";

    let newGame = "";
	let invalid: boolean;

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
        <button class="btn variant-filled-primary mt-4" disabled="{checkDisabled(newGame)}">Add Game</button>
    </form>
</div>