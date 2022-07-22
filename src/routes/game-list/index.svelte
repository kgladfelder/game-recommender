<script lang="ts">
import { Genre } from '../../types';

	import { gameStore } from '../../stores';

	const setLocalStorage = () => {
		localStorage.setItem('games', JSON.stringify($gameStore));
	};

	const removeGame = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		if (ind > -1) {
			$gameStore.splice(ind, 1);
			$gameStore = $gameStore;
			setLocalStorage();
		}
		return null;
	};

	const completeGame = (id: string) => {
		const ind: number = $gameStore.findIndex((x) => x.id === id);
		if (ind > -1) {
			if (!$gameStore[ind].completedDate) {
				$gameStore[ind].completedDate = new Date();
			} else {
				$gameStore[ind].completedDate = undefined;
			}
			setLocalStorage();
		}
		return null;
	};
</script>

<div>
	<a href="/add-game">Add Game</a>
	<table>
		<tr>
			<th>Completed</th>
			<th>Game Name</th>
			<th>Platform</th>
			<th>Genres</th>
			<th>Main Story</th>
			<th>Main + Extras</th>
			<th>Completionist</th>
			<th>Developer</th>
			<th>Publisher</th>
			<th>Date Added</th>
			<th>Delete</th>
		</tr>
		{#each $gameStore as game}
			<tr>
				<td
					><input
						type="checkbox"
						checked={game.completedDate ? true : false}
						on:click={completeGame(game.id)}
					/></td
				>
				<td>{game.gameName}</td>
				<td>{game.platform ?? 'Unknown'}</td>
				<td>{game.genres?.map(x => Genre[x].toString()).join(', ') ?? 'Unkown'}</td>
				<td>{game.mainStory ?? 'Unknown'}</td>
				<td>{game.mainExtras ?? 'Unknown'}</td>
				<td>{game.completionist ?? 'Unknown'}</td>
				<td>{game.developer ?? 'Unknown'}</td>
				<td>{game.publisher ?? 'Unknown'}</td>
				<td>{game.createdDate.toLocaleString()}</td>
				<td><button on:click={removeGame(game.id)}>Trash</button></td>
			</tr>
		{/each}
	</table>
</div>
