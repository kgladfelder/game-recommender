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

<div>
	<h1>Manage Companies</h1>
	<!-- Add new Company-->
	<div>
		<button on:click|preventDefault="{switchShowNewCompany}"> Add </button>
	</div>
	<div>
		<form method="POST" action="?/create">
			<label for="companyName">Company Name</label>
			<input id="companyName" name="companyName" bind:value="{newCompany}" type="text" required />
			<button disabled="{checkDisabled(newCompany)}">Add Company</button>
			<button on:click|preventDefault="{switchShowNewCompany}"> Cancel </button>
		</form>
	</div>
	<!-- List existing -->
	<div>
		{#if companies}
			{#each companies as company (company.id)}
				<div>
					<div>{company.name}</div>
					<div>
						<form method="POST" action="?/delete">
							<input type="hidden" name="id" value="{company.id}" />
							<button> Delete </button>
						</form>
					</div>
				</div>
			{/each}
		{:else}
			<h3>No Companies entered.</h3>
		{/if}
	</div>
</div>
