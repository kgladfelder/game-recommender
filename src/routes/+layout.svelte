<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Rec Game</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en"></html>
</svelte:head>

<div class="container flex flex-col w-screen h-screen">
	<Header />
	<main class="grow grid grid-rows-1 grid-flow-col place-items-center">
		<slot />
	</main>
	<Footer />
</div>
