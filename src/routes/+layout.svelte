<script lang="ts">
	import type { PageData } from "./$types";
    export let data: PageData;

	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let username: string | undefined = data.username;
	let admin: boolean | undefined = data.admin;
</script>

<svelte:head>
	<title>Rec Game</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en"></html>
</svelte:head>

<div>
	<Header username={username} admin={admin}/>
	<main>
		<slot />
	</main>
	<Footer />
</div>
