<script lang="ts">
	import type { PageData } from "./$types";
	import { fieldInvalid } from "$lib/utils";
	export let data: PageData;

	let companies = data.companies;
	let newCompany = "";
	let invalid: boolean;
	let showNewCompany = false;

	const checkDisabled = (newCompany: string) => {
		invalid = fieldInvalid(newCompany);
		return invalid;
	};

	const switchShowNewCompany = () => {
		newCompany = "";
		showNewCompany = !showNewCompany;
	};
</script>

<div class="container mx-auto">
	<div class="h1 mt-2 mb-2">Manage Companies</div>
	<hr class="!border-t-4 mb-2" />
	<!-- List existing -->
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Company Name</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if companies}
					{#each companies as company (company.id)}
						<tr>
							<td>{company.name}</td>
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
				<span>Company Name</span>
				<input
					class="input"
					name="companyName"
					id="companyName"
					placeholder="Company Name"
					bind:value="{newCompany}"
					type="text"
					required />
			</label>
			<button disabled="{checkDisabled(newCompany)}">Add Company</button>
			<button on:click|preventDefault="{switchShowNewCompany}">Cancel</button>
		</form>
	</div>
</div>
