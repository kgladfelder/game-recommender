<script lang="ts">
	import type { PageData } from './$types';
	import { fieldInvalid } from '$lib/utils';
	export let data: PageData;

	let companies = data.companies;
	let newCompany: string = '';
	let invalid: boolean;
	let showNewCompany = false;

	const checkDisabled = (newCompany: string) => {
		invalid = fieldInvalid(newCompany);
		return invalid;
	};

	const switchShowNewCompany = () => {
		newCompany = '';
		showNewCompany = !showNewCompany;
	};
</script>

<div class="sm:w-5/6 bg-red-100 rounded-lg p-8 flex flex-col w-full h-full mt-5 mb-5">
	<h1>Manage Companies</h1>
	<!-- Add new Company-->
	<div class:hidden="{showNewCompany}">
		<button
			on:click|preventDefault="{switchShowNewCompany}"
			class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
			Add
		</button>
	</div>
	<div
		class:hidden="{!showNewCompany}"
		class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
		<form method="POST" action="?/create">
			<label for="companyName" class="leading-7 text-sm text-gray-600">Company Name</label>
			<input
				id="companyName"
				name="companyName"
				bind:value="{newCompany}"
				type="text"
				required
				class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
			<button
				class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
				class:bg-blue-300="{invalid}"
				class:hover:bg-blue-300="{invalid}"
				disabled="{checkDisabled(newCompany)}">Add Company</button>
			<button
				on:click|preventDefault="{switchShowNewCompany}"
				class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
				Cancel
			</button>
		</form>
	</div>
	<!-- List existing -->
	<div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg flex flex-col p-8 w-full mt-10 md:mt-0">
		{#each companies as company}
			<div class="flex flex-row">
				<div class="sm:w-1/2">{company.name}</div>
				<div class="sm:w-1/2">
					<form method="POST" action="?/delete">
                        <input type="hidden" name="id" value="{company.id}">
						<button
							class="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
							Delete
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
</div>
