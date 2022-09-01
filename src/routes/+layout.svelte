<svelte:head>
	<title>Rec Game</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en"></html>
</svelte:head>

<div class="flex-container">
	<header>
		<!-- TODO: Improve this -->
		<nav>
			<a class="simple-link nav-logo" href="/">Rec Game</a>
			<ul>
				<li class="nav-link-item">
					<a aria-label="Games List" class="simple-link" href="/game-list">Games List</a>
				</li>
				<li class="nav-link-item">
					<a aria-label="Game Selector" class="simple-link" href="/game-selector">Game Selector</a>
				</li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		<!-- TODO: Improve this -->
		<div class="footer-code">
			<a
				class="simple-link"
				href="https://github.com/kgladfelder/game-recommender"
				title="Github"
				target="_blank"
				rel="noopener noreferrer">
				<i class="material-icons">code</i>
			</a>
		</div>
	</footer>
</div>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}

	.simple-link {
		text-decoration: none;
		color: rgb(0, 0, 0);
	}

	.footer-code {
		display: flex;
		justify-content: right;
		align-items: center;
		margin-right: 3em;
	}

	.nav-link-item {
		text-decoration: none;
		list-style: none;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;

		float: left;
		padding-right: 1em;
		height: 100%;
	}

	.nav-logo {
		font-size: xx-large;
		font-weight: 600;
	}

	header {
		height: 50px;
		min-height: 50px;
		background: rgb(136, 227, 255);
		color: rgb(0, 0, 0);
	}

	footer {
		height: 30px;
		min-height: 30px;
		background: rgb(136, 227, 255);
		color: rgb(0, 0, 0);
	}

	main {
		overflow: auto;
		flex: 1;
	}

	nav {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
	}

	nav ul {
		margin-top: 0px;
		padding-left: 1em;
		height: 100%;
	}
</style>
