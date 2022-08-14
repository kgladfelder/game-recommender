<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Rec Game</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<nav>
	<div class="nav-wrapper light-blue darken-3">
		<a href="/" class="brand-logo right hide-on-med-and-down"> Rec Game </a>
		<ul id="nav-mobile" class="left">
			<li>
				<a aria-label="Home" href="/">Home</a>
			</li>
			<li>
				<a aria-label="Games List" href="/game-list"> Game List </a>
			</li>
			<li>
				<a aria-label="Game Selector" href="/game-selector"> Game Selector </a>
			</li>
		</ul>
	</div>
</nav>
<slot style="height:100% - 64px;" />
