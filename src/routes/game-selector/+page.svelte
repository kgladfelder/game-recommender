<script lang="ts">
	import { gameStore } from '../../stores';
	import { Platform, type Game } from '../../types';

	let randGame: Game | undefined;

	const chooseRandom = () => {
		const possibleGames = $gameStore.filter((x) => x.completedDate === undefined);
		randGame = possibleGames[Math.floor(Math.random() * possibleGames.length)];
	};

	chooseRandom();
</script>

<div>
	<div class="row">
		<div class="col s1 m1"></div>
		<div class="col s8 m6">
			{#if randGame}
				<div class="card cyan darken-2">
					<div class="card-content white-text">
						<span class="card-title">{randGame.gameName}</span>
						<div class="row">
							<span class="col s12 card-subtitle">
								{randGame.platform !== undefined ? Platform[randGame.platform] : 'Unknown'}
							</span>
						</div>
						<div class="row">
							<div class="col s4">
								<div class="row">
									<p class="col s12 card-hours">Main Story:</p>
									<p class="col s12 card-hours-text">
										{randGame.mainStory}
										{randGame.mainStory !== 1 ? 'hours' : 'hour'}
									</p>
								</div>
							</div>
							<div class="col s4">
								<div class="row">
									<p class="col s12 card-hours">Main Story + Extras:</p>
									<p class="col s12 card-hours-text">
										{randGame.mainExtras}
										{randGame.mainExtras !== 1 ? 'hours' : 'hour'}
									</p>
								</div>
							</div>
							<div class="col s4">
								<div class="row">
									<p class="col s12 card-hours">Completionist:</p>
									<p class="col s12 card-hours-text">
										{randGame.completionist}
										{randGame.completionist !== 1 ? 'hours' : 'hour'}
									</p>
								</div>
							</div>
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
		<div class="col s2 m4">
			{#each $gameStore.filter((x) => x.completedDate === undefined) as unfinished}
				<div class="card red accent-1">
					<div class="card-content">
						<div class="card-side-title">{unfinished.gameName}</div>
						<div class="card-side-subtitle">
							{unfinished.platform !== undefined ? Platform[unfinished.platform] : 'Unknown'}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.card-title {
		font-size: 30px;
		font-weight: 600px;
	}
	.card-side-title {
		font-size: 20px;
		font-weight: 500;
	}
	.card-subtitle {
		font-size: 20px;
		font-weight: 500;
	}
	.card-side-subtitle {
		font-size: 18px;
		font-weight: 400;
	}
	.card-hours {
		font-size: 16px;
		font-weight: 400;
	}
	.card-hours-text {
		font-size: 20px;
		font-weight: 700;
	}
</style>
