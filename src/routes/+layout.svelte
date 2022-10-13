<script lang="ts">
	import type { PageData } from "./$types";
    export let data: PageData;

	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let username: string = data.username;
</script>

<svelte:head>
	<title>Rec Game</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en"></html>
</svelte:head>

<div class="flex flex-col w-screen h-screen">
	<Header username={username} />
	<main class="grow grid grid-rows-1 grid-flow-col place-items-center">
		<slot />
	</main>
	<Footer />
</div>
