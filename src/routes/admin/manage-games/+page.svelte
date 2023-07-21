<script lang="ts">
	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	export let data: PageData;

	let games = data.games;
	let publishers = data.publishers;
	let developers = data.developers;
	let systems = data.systems;
	let genres = data.genres;

	const addNewGame = () => {
		const modal: ModalSettings = {
			type: "component",
			component: "createGame",
			meta: { publishers, developers, systems, genres },
		};
		modalStore.trigger(modal);
	};
</script>

<div class="container mx-auto">
	<div class="h1 mt-2">Manage Games</div>
	<hr class="!border-t-4 mb-2" />
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Game Name</th>
					<th class="w-1/4">Action</th>
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
		</table>
	</div>
	<div class="card variant-ghost-secondary p-4 mt-4 mb-4">
		<button class="btn btn-sm variant-ghost-primary" on:click|preventDefault="{addNewGame}">
			<span class="material-icons">add</span>
			New
		</button>
		PAGINATE ME
	</div>
</div>
