<script lang="ts">
	import type { PageData } from "./$types";
	import { fieldInvalid } from "$lib/utils";
	export let data: PageData;

	let publishers = data.publishers;
	let newPublishers = "";
	let invalid: boolean;

	const checkDisabled = (newPublisher: string) => {
		invalid = fieldInvalid(newPublisher);
		return invalid;
	};
</script>

<div class="container mx-auto">
	<div class="h1 mt-2">Manage Publishers</div>
	<hr class="!border-t-4 mb-2" />
	<!-- List existing -->
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Publisher</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#if publishers}
					{#each publishers as publisher (publisher.id)}
						<tr>
							<td>{publisher.name}</td>
							<td>
								<form method="POST" action="?/delete">
									<input type="hidden" name="id" value="{publisher.id}" />
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
				<span>Publisher</span>
				<input
					class="input"
					name="publisherName"
					id="publisherName"
					placeholder="Publisher"
					bind:value="{newPublishers}"
					type="text"
					required />
			</label>
			<button disabled="{checkDisabled(newPublishers)}">Add Publisher</button>
		</form>
	</div>
</div>
