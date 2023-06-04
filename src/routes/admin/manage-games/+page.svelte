<script lang="ts">
	import type { PageData } from "./$types";
	import { fieldInvalid } from "$lib/utils";
	export let data: PageData;

	let games = data.games;
	let newGame = "";
	let invalid: boolean;

	const checkDisabled = (newCompany: string) => {
		invalid = fieldInvalid(newCompany);
		return invalid;
	};
</script>

<div class="container mx-auto">
	<div class="h1 mt-2">Manage Games</div>
	<hr class="!border-t-4 mb-2" />
	<!-- List existing -->
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Game Name</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if games}
					{#each games as game (game.id)}
						<tr>
							<td>{game.name}</td>
							<td>
								<form method="POST" action="?/delete">
									<input type="hidden" name="id" value="{game.id}" />
									<button class="btn btn-sm variant-ghost-error">
										<span class="material-icons">delete</span>
										<span>Delete</span>
									</button>
								</form>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
			<tfoot>
				<tr>
					<td>
						<button class="btn btn-sm variant-ghost-secondary">
							<span class="material-icons">add</span>
							<span>New</span>
						</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
	<div>
		<form method="POST" action="?/create">
			<label class="label">
				<span>Game Name</span>
				<input
					class="input"
					name="companyName"
					id="companyName"
					placeholder="Game"
					bind:value="{newGame}"
					type="text"
					required />
			</label>
			<button disabled="{checkDisabled(newGame)}">Add Game</button>
		</form>
	</div>
</div>
