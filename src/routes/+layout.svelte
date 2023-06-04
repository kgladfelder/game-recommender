<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import "@skeletonlabs/skeleton/themes/theme-crimson.css";
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import "@skeletonlabs/skeleton/styles/skeleton.css";
	// Most of your app wide CSS should be put in this file
	import "../app.postcss";
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
	import { AppShell, storePopup } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: PageData;
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	let username: string | undefined = data.username;
	let admin: boolean | undefined = data.admin;
</script>

<svelte:head>
	<title>Rec Game</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>
<AppShell>
	<svelte:fragment slot="header">
		<Header username="{username}" admin="{admin}" />
	</svelte:fragment>
	<main class="flex-grow">
		<slot />
	</main>
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</AppShell>
