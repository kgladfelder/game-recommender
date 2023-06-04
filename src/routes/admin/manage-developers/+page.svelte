<script lang="ts">
	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	export let data: PageData;

	let developers = data.developers;
	
	const addNewDeveloper = () => {
		const modal: ModalSettings = {
			type: "component",
			component: "createDeveloper",
		};
		modalStore.trigger(modal);
	};
</script>

<div class="container mx-auto">
	<div class="h1 mt-2">Manage Developers</div>
	<hr class="!border-t-4 mb-2" />
	<!-- List existing -->
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Developer Name</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if developers}
					{#each developers as developer (developer.id)}
						<tr>
							<td>{developer.name}</td>
							<td>
								<form method="POST" action="?/delete">
									<input type="hidden" name="id" value="{developer.id}" />
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
						<button
							class="btn btn-sm variant-ghost-secondary"
							on:click|preventDefault="{addNewDeveloper}">
							<span class="material-icons">add</span>
							<span>New</span>
						</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
