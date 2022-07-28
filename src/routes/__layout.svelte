<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Game List and Pick</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<nav>
	<div class="nav-wrapper light-blue darken-3">
		<a href="/" class="brand-logo">
			Game Recommender
		</a>
		<ul id="nav-mobile" class="right hide-on-med-and-down">
			<li>
				<a 
					aria-label="Games List"
					class="waves-effect waves-light btn"
					href='/game-list'
				>
					Game List
				</a>
			</li>
			<li>
				<a
					aria-label="Game Selector"
					class="waves-effect waves-light btn"
					href='/game-selector'
				>
					Game Selector
				</a>
			</li>
		</ul>
	</div>
</nav>
<slot />

<style>
	.brand-logo {
		margin-left: 1em;
	}
</style>