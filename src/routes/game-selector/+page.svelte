<script lang="ts">
	import { gameStore } from '../../stores';
	import { Platform, type Game } from '../../lib/types';

	let randGame: Game | undefined;
	let games = $gameStore.filter((x) => x.completedDate === undefined).sort((a, b) => {
		if (a.gameName > b.gameName) {
			return 1;
		} else if (a.gameName < b.gameName) {
			return -1;
		} else {
			return 0;
		}
	});

	const chooseRandom = () => {
		const possibleGames = $gameStore.filter((x) => x.completedDate === undefined);
		randGame = possibleGames[Math.floor(Math.random() * possibleGames.length)];
	};

	chooseRandom();
</script>

<div>
	<div class="row">
		<div class="col s1 m1"></div>
		<div class="col s10">
			{#if randGame}
				<div class="card">
					<div class="card-title blue lighten-4 ctr">{randGame.gameName}</div>
					<div class="card-content">
						<div class="row">
							<span class="col s12 card-subtitle">
								{randGame.platform !== undefined ? Platform[randGame.platform] : 'Unknown'}
							</span>
						</div>
						<div class="row">
							<div class="col s4">
								<div class="hours">{randGame.mainStory}</div>
								<div class="hours-desc">Main Story</div>
							</div>
							<div class="col s4">
								<div class="hours">{randGame.mainExtras}</div>
								<div class="hours-desc">Main Story + Extras</div>
							</div>
							<div class="col s4">
								<div class="hours">{randGame.completionist}</div>
								<div class="hours-desc">Completionist</div>
							</div>
						</div>
						<div class="row">
							{randGame.description}
						</div>
					</div>
					<div class="card-action">
						<button
							on:click="{chooseRandom}"
							class="waves-effect waves-light cyan darken-1 btn-flat white-text">
							Choose Another
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="row">
		{#each games as unfinished}
			<div class="col s4 m2">
				<div class="card">
					<div class="card-title teal lighten-4 ctr">{unfinished.gameName}</div>
					<div class="card-content">
						<div class="card-side-subtitle">
							{unfinished.platform !== undefined ? Platform[unfinished.platform] : 'Unknown'}
						</div>
						<div class="row">
							<div class="col s4">
								<div class="hours">{unfinished.mainStory}</div>
								<div class="hours-desc">Main Story</div>
							</div>
							<div class="col s4">
								<div class="hours">{unfinished.mainExtras}</div>
								<div class="hours-desc">Main Story + Extras</div>
							</div>
							<div class="col s4">
								<div class="hours">{unfinished.completionist}</div>
								<div class="hours-desc">Completionist</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.card-title {
		font-size: 30px;
		font-weight: 600px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.card-subtitle {
		font-size: 20px;
		font-weight: 500;
	}

	.card-side-subtitle {
		font-size: 18px;
		font-weight: 400;
	}

	.ctr {
		text-align: center;
	}

	.hours {
		font-size: xx-large;
		text-align: center;
	}

	.hours-desc {
		font-size: smaller;
		text-align: center;
	}
</style>
