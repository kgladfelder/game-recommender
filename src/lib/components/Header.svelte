<script lang="ts">
	import { AppBar, ListBox, ListBoxItem, popup, type PopupSettings } from "@skeletonlabs/skeleton";

	export let username: string | undefined;
	export let admin: boolean | undefined;

	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: "focus-click",
		target: "popupCombobox",
		placement: "bottom",
		closeQuery: ".listbox-item",
	};
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<button class="btn variant-filled w-48 justify-between" use:popup="{popupCombobox}">
			<span class="capitalize">{comboboxValue ?? "Menu"}</span>
			<span>↓</span>
		</button>
		<div class="card w-48 shadow-xl py-2" data-popup="popupCombobox">
			<nav class="list-nav">
				<ListBox rounded="rounded-none">
					<ListBoxItem bind:group="{comboboxValue}" name="medium" value="home">
						<a href="/">Home</a>
					</ListBoxItem>
					{#if username && admin}
						<span class="ml-4">Admin</span>
						<ListBoxItem bind:group="{comboboxValue}" name="medium" value="companies">
							<a href="/admin/manage-companies">Manage Companies</a>
						</ListBoxItem>
						<ListBoxItem bind:group="{comboboxValue}" name="medium" value="developers">
							<a href="/admin/manage-developers">Manage Developers</a>
						</ListBoxItem>
						<ListBoxItem bind:group="{comboboxValue}" name="medium" value="games">
							<a href="/admin/manage-games">Manage Games</a>
						</ListBoxItem>
						<ListBoxItem bind:group="{comboboxValue}" name="medium" value="genres">
							<a href="/admin/manage-genres">Manage Genres</a>
						</ListBoxItem>
						<ListBoxItem bind:group="{comboboxValue}" name="medium" value="publishers">
							<a href="/admin/manage-publishers">Manage Publishers</a>
						</ListBoxItem>
						<ListBoxItem bind:group="{comboboxValue}" name="medium" value="systems">
							<a href="/admin/manage-systems">Manage Systems</a>
						</ListBoxItem>
					{/if}
				</ListBox>
				<div class="arrow bg-surface-100-800-token"></div>
			</nav>
		</div>
	</svelte:fragment>
	<!-- TODO: Replace with breadcrumbs? -->
	<a href="/">Game Recommender</a>
	<svelte:fragment slot="trail">
		{#if username}
			<a href="/user/{username}">{username}</a>
		{:else}
			<a href="/login">Log In</a>
			<a href="/signup">Sign Up</a>
		{/if}
	</svelte:fragment>
</AppBar>
