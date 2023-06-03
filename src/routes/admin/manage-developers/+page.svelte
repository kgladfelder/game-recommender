<script lang="ts">
	import type { PageData } from "./$types";
	import { fieldInvalid } from "$lib/utils";
	export let data: PageData;

	let developers = data.developers;

	let newDeveloper = "";
	let invalid: boolean;
	let showNewDeveloper = false;

	const checkDisabled = (newDeveloper: string) => {
		invalid = fieldInvalid(newDeveloper);
		return invalid;
	};

	const switchShowNewDeveloper = () => {
		newDeveloper = "";
		showNewDeveloper = !showNewDeveloper;
	};
</script>

<div>
	<h1>Manage Developers</h1>
	<!-- Add new Developer -->
	<div>
		<button on:click|preventDefault="{switchShowNewDeveloper}"> Add </button>
	</div>
	<div>
		<form method="POST" action="?/create">
			<label for="developerName">Developer Name</label>
			<input
				id="developerName"
				name="developerName"
				bind:value="{newDeveloper}"
				type="text"
				required />
			<button disabled="{checkDisabled(newDeveloper)}">Add Developer</button>
			<button on:click|preventDefault="{switchShowNewDeveloper}"> Cancel </button>
		</form>
	</div>
	<!-- List existing -->
	<div>
		{#if developers}
			{#each developers as developer (developer.id)}
				<div>
					<div>{developer.name}</div>
					<div>
						<form method="POST" action="?/delete">
							<input type="hidden" name="id" value="{developer.id}" />
							<button> Delete </button>
						</form>
					</div>
				</div>
			{/each}
		{:else}
			<h3>No Developers entered.</h3>
		{/if}
	</div>
</div>
