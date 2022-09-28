<script lang="ts">
	import { Genre, Platform, type Game } from '$lib/types';

	export let game: Game;

	let hoursArray: { hours: number | undefined; section: string }[] = [];
	let detailsArry: { detail: string | undefined; section: string }[] = [];

	$: hoursArray = [
		{
			hours: game.mainStory,
			section: 'Main Story',
		},
		{
			hours: game.mainExtras,
			section: 'Main Story + Extras',
		},
		{
			hours: game.completionist,
			section: 'Completionist',
		},
	];

	$: detailsArry = [
		{
			detail: fullPlatform,
			section: 'Platform',
		},
		{
			detail: fullDeveloper,
			section: 'Developer',
		},
		{
			detail: fullPublisher,
			section: 'Publisher',
		},
	];

	let fullPlatform: string;
	$: fullPlatform = game.platform !== undefined ? Platform[game.platform] : 'Unknown';
	let fullPublisher: string;
	$: fullPublisher = game.publisher ?? '';
	let fullDeveloper: string;
	$: fullDeveloper = game.developer ?? '';
	let fullGenres: string; // TODO: Add Genres somewhere
	$: fullGenres = game.genres?.map((x) => Genre[x].toString()).join('\n') ?? 'Unkown';
</script>

<div class="card">
	<h2>
		{game.gameName}
	</h2>
	<div class="card-main">
		{#each hoursArray as ha}
			<div class="card-section">
				<div class="section">{ha.section}</div>
				<div class="hours">{ha.hours ?? ''}</div>
			</div>
		{/each}
		{#each detailsArry as da}
			<div class="card-section">
				<div class="section">{da.section}</div>
				<div class="detail">{da.detail}</div>
			</div>
		{/each}
		<div class="card-section-double">
			<h3>Description:</h3>
			<p class="description">{game.description}</p>
		</div>
		<div>
			<h3>Genres</h3>
			<p class="genres">{fullGenres}</p>
		</div>
	</div>
</div>

<style>
	h2 {
		font-size: 40px;
		line-height: 1em;
	}

	.card {
		border-style: solid;
		border-width: 2px;
		padding: 1em;
		margin: 1em;
		min-height: 575px;
		max-height: 575px;
		display: flex;
		flex-direction: column;
	}

	.card-main {
		display: grid;
		grid-template-columns: 33% 33% 33%;
		gap: 15px 15px;
	}

	.card-section {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.card-section-double {
		grid-column: 1 / 3;
	}

	.section {
		text-align: center;
	}

	.hours {
		text-align: center;
		font-size: 90px;
	}

	.detail {
		text-align: center;
		font-size: 45px;
	}

	.description {
		min-height: 10em;
		max-height: 10em;
		overflow: auto;
	}

	.genres {
		white-space: pre;
		min-height: 10em;
		max-height: 10em;
		overflow: auto;
	}
</style>
