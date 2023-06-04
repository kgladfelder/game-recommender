<script lang="ts">
	import type { PageData } from "./$types";
	import { fieldInvalid } from "$lib/utils";
	export let data: PageData;

	const systems = data.systems;
	let newSystemName = "";
	let companyId = "";
	let invalid: boolean;

	const checkDisabled = (newSystemName: string) => {
		invalid = fieldInvalid(newSystemName) || fieldInvalid(companyId);
        
		return invalid;
	};

</script>

<div class="container mx-auto">
	<div class="h1 mt-2">Manage Systems</div>
	<hr class="!border-t-4 mb-2" />
	<!-- List existing -->
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>System</th>
					<th>Company</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if systems}
					{#each systems as system (system.id)}
						<tr>
							<td>{system.name}</td>
							<td>{system.company.name}</td>
							<td>
								<form method="POST" action="?/delete">
									<input type="hidden" name="id" value="{system.id}" />
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
				<span>System</span>
				<input
					class="input"
					name="systemName"
					id="systemName"
					placeholder="System"
					bind:value="{newSystemName}"
					type="text"
					required />
			</label>
			<button disabled="{checkDisabled(newSystemName)}">Add System</button>
		</form>
	</div>
</div>
