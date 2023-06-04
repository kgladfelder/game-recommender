<script lang="ts">
	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	export let data: PageData;

	let companies = data.companies;

	const addNewCompany = () => {
		const modal: ModalSettings = {
			type: "component",
			component: "createCompany",
		};
		modalStore.trigger(modal);
	};
</script>

<div class="container mx-auto">
	<div class="h1 mt-2">Manage Companies</div>
	<hr class="!border-t-4 mb-2" />
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Company</th>
					<th>Systems</th>
					<th class="w-1/4" />
				</tr>
			</thead>
			<tbody>
				{#if companies}
					{#each companies as company (company.id)}
						<tr>
							<td>{company.name}</td>
							<td>{company.Systems.map((system) => system.name).join(", ")}</td>
							<td>
								<form method="POST" action="?/delete">
									<input type="hidden" name="id" value="{company.id}" />
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
							on:click|preventDefault="{addNewCompany}">
							<span class="material-icons">add</span>
							<span>New</span>
						</button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
