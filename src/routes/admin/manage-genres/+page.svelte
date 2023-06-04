<script lang="ts">
	import type { PageData } from "./$types";
	import { fieldInvalid } from "$lib/utils";
	export let data: PageData;

	let genres = data.genres;
	let newGenre = "";
	let invalid: boolean;

	const checkDisabled = (newGenre: string) => {
		invalid = fieldInvalid(newGenre);
		return invalid;
	};
</script>

<div class="container mx-auto">
	<div class="h1 mt-2">Manage Genres</div>
	<hr class="!border-t-4 mb-2" />
	<!-- List existing -->
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Genre</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if genres}
					{#each genres as genre (genre.id)}
						<tr>
							<td>{genre.name}</td>
							<td>
								<form method="POST" action="?/delete">
									<input type="hidden" name="id" value="{genre.id}" />
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
				<span>Genre</span>
				<input
					class="input"
					name="genreName"
					id="genreName"
					placeholder="Genre"
					bind:value="{newGenre}"
					type="text"
					required />
			</label>
			<button disabled="{checkDisabled(newGenre)}">Add Genre</button>
		</form>
	</div>
</div>
