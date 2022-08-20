import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/svelte';
import { Chance } from 'chance';

import type { hltbSearch } from '$lib/types';

import GameSearchAndSelect from './index.svelte';

describe('game search', () => {
	const chance = new Chance();
	let games: hltbSearch[];

	beforeEach(() => {
		games = buildManyHltbSearchResults(chance);
	})

	it('should render visible', () => {
		render(GameSearchAndSelect, { visible: true });
		expect(screen.queryByText("Game Search:")).toBeInTheDocument();
	});

	it('should search for a game and return results', async () => {
		// TODO: Figure out how to intercept the api call

		render(GameSearchAndSelect, { visible: true });
		expect(screen.queryByText("Game Search:")).toBeInTheDocument();

		const inputBox = screen.getByLabelText("Game Name");
		const submitBtn = screen.getByText('Submit');

		await act(() => {
			fireEvent.input(inputBox, { target: { value: games[0].searchGameName } });
		});

		fireEvent.click(submitBtn);
	})
});

describe('hidden game search', () => {
	it('should not render visible', () => {
		render(GameSearchAndSelect, { visible: false });
		expect(screen.queryByText("Game Search:")).not.toBeInTheDocument();
	});
});

const buildManyHltbSearchResults = (chance: Chance.Chance): hltbSearch[] => {
	const num = chance.natural({ min: 1, max: 15 });
	const searchGameName = chance.word();
	const ret = [];
	for (let i = 0; i < num; i++) {
		ret.push(buildhltbSearchResult(chance, searchGameName));
	}
	return ret;
}

const buildhltbSearchResult = (chance: Chance.Chance, searchGameName: string): hltbSearch => {
	return {
		detailId: chance.natural().toString(),
		gameName: chance.word(),
		gameDescription: chance.sentence(),
		platforms: chance.pickset(platforms, 3),
		genres: chance.pickset(genres, 5),
		gameImage: chance.url(),
		timeLabels: [],
		main: chance.natural(),
		mainExtra: chance.natural(),
		complete: chance.natural(),
		distancePercentage: chance.natural(),
		searchGameName,
		publisher: chance.word(),
		developer: chance.word(),
		naRelease: undefined,
		euRelease: undefined,
		jpRelease: undefined,
	}
}

const platforms = ["Steam", "Switch", "PS5", "Series S/X", "Android", "iOS"];
const genres = [
	'Action',
	'Adventure',
	'Arcade',
	'Battle Arena',
	"Beat 'em Up",
	'Board Game',
	'Breakout',
	'Card Game',
	'City-Building',
	'Compilation',
	'Educational',
	'Fighting',
	'Fitness',
	'Flight',
	'Full Motion Video (FMV)',
	'Hack and Slash',
	'Hidden Object',
	'Horror',
	'Interactive Art',
	'Management',
	'Music/Rhythm',
	'Open World',
	'Party',
	'Pinball',
	'Platform',
	'Puzzle',
	'Racing/Driving',
	'Roguelike',
	'Role-Playing',
	'Sandbox',
	'Shooter',
	'Simulation',
	'Social',
	'Sports',
	'Stealth',
	'Strategy/Tactical',
	'Survival',
	'Tower Defense',
	'Trivia',
	'Vehicular Combat',
	'Visual Novel'
]