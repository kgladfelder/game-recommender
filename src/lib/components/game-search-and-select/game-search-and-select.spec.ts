import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/svelte';
import { Chance } from 'chance';
import { vi } from 'vitest';

import type { hltbSearch } from '$lib/types';
import halo_infinite from './replies/halo_infinite';
import halo_search from './replies/halo_search';
import GameSearchAndSelect from './index.svelte';

describe('game search', () => {
	const chance = new Chance();
	let games: hltbSearch[];

	const detailResolve: Response = {
		headers: {
			append: vi.fn(),
			delete: vi.fn(),
			get: vi.fn(),
			has: vi.fn(),
			set: vi.fn(),
			forEach: vi.fn(),
			entries: vi.fn(),
			keys: vi.fn(),
			values: vi.fn(),
			[Symbol.iterator]: vi.fn(),
		},
		ok: true,
		redirected: false,
		status: 200,
		statusText: 'OK',
		type: 'basic',
		url: '',
		clone: vi.fn(),
		json: () => Promise.resolve(halo_infinite),
		body: null,
		bodyUsed: false,
		text: vi.fn(),
		arrayBuffer: vi.fn(),
		blob: vi.fn(),
		formData: vi.fn(),
	};

	const searchResolve: Response = {
		headers: {
			append: vi.fn(),
			delete: vi.fn(),
			get: vi.fn(),
			has: vi.fn(),
			set: vi.fn(),
			forEach: vi.fn(),
			entries: vi.fn(),
			keys: vi.fn(),
			values: vi.fn(),
			[Symbol.iterator]: vi.fn(),
		},
		ok: true,
		redirected: false,
		status: 200,
		statusText: 'OK',
		type: 'basic',
		url: '',
		clone: vi.fn(),
		json: () => Promise.resolve(halo_search),
		body: null,
		bodyUsed: false,
		text: vi.fn(),
		arrayBuffer: vi.fn(),
		blob: vi.fn(),
		formData: vi.fn(),
	};

	const rejectResolve: Response = {
		headers: {
			append: vi.fn(),
			delete: vi.fn(),
			get: vi.fn(),
			has: vi.fn(),
			set: vi.fn(),
			forEach: vi.fn(),
			entries: vi.fn(),
			keys: vi.fn(),
			values: vi.fn(),
			[Symbol.iterator]: vi.fn(),
		},
		ok: false,
		redirected: false,
		status: 404,
		statusText: 'NOT FOUND',
		type: 'error',
		url: '',
		clone: vi.fn(),
		json: vi.fn(),
		body: null,
		bodyUsed: false,
		text: vi.fn(),
		arrayBuffer: vi.fn(),
		blob: vi.fn(),
		formData: vi.fn(),
	};

	beforeEach(() => {
		games = buildManyHltbSearchResults(chance);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		global.fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit | undefined) => {
			if (/api\/game-search\?gameName=/.test(input.toString())) {
				return Promise.resolve(searchResolve);
			} else if (/api\/game-detail/.test(input.toString())) {
				return Promise.resolve(detailResolve);
			} else {
				return Promise.resolve(rejectResolve);
			}
		});
		crypto.randomUUID = vi.fn(() => chance.guid());
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should render visible', () => {
		render(GameSearchAndSelect, { visible: true });
		expect(screen.queryByText('Game Search:')).toBeInTheDocument();
	});

	it('should search for a game and return no results if there was some issue', async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		global.fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit | undefined) => {
			return Promise.resolve(rejectResolve);
		});

		render(GameSearchAndSelect, { visible: true });
		expect(screen.queryByText('Game Search:')).toBeInTheDocument();
		expect(screen.queryByText('Please search for a game.')).toBeInTheDocument();

		const inputBox = screen.getByLabelText('Game Name');
		const submitBtn = screen.getByText('Submit');

		await act(() => {
			fireEvent.input(inputBox, { target: { value: games[0].searchGameName } });
		});

		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(screen.queryByText('Please search for a game.')).not.toBeInTheDocument();
			expect(
				screen.queryByText('No results found. Please search for another game.')
			).toBeInTheDocument();
		});
	});

	it('should search for a game and return results', async () => {
		render(GameSearchAndSelect, { visible: true });
		expect(screen.queryByText('Game Search:')).toBeInTheDocument();
		expect(screen.getByText('Please search for a game.')).toBeInTheDocument();

		const inputBox = screen.getByLabelText('Game Name');
		const submitBtn = screen.getByText('Submit');

		await act(() => {
			fireEvent.input(inputBox, { target: { value: games[0].searchGameName } });
		});

		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(screen.queryByText('Please search for a game.')).not.toBeInTheDocument();
			expect(
				screen.queryByText('No results found. Please search for another game.')
			).not.toBeInTheDocument();
		});
	});

	it('should search for a game and submit results', async () => {
		const { component } = render(GameSearchAndSelect, { visible: true });

		const mockEvent = vi.fn();
		component.$on('game', function (event) {
			mockEvent(event.detail);
		});

		expect(screen.queryByText('Game Search:')).toBeInTheDocument();
		expect(screen.getByText('Please search for a game.')).toBeInTheDocument();

		const inputBox = screen.getByLabelText('Game Name');
		const submitBtn = screen.getByText('Submit');

		await act(() => {
			fireEvent.input(inputBox, { target: { value: games[0].searchGameName } });
		});

		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(screen.queryByText('Please search for a game.')).not.toBeInTheDocument();
			expect(
				screen.queryByText('No results found. Please search for another game.')
			).not.toBeInTheDocument();
		});

		const gamesFound = screen.getAllByTestId(/game-card-/);
		expect(gamesFound).toHaveLength(20);
		const selectBtn = within(gamesFound[0]).getByText('Select Game');

		fireEvent.click(selectBtn);

		await waitFor(() => {
			expect(mockEvent).toHaveBeenCalledTimes(1);
			expect(mockEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					gameName: halo_infinite.gameName,
					mainStory: halo_infinite.main,
					developer: halo_infinite.developer,
				})
			);
		})
	});

	it('should cancel the search', async () => {
		const { component } = render(GameSearchAndSelect, { visible: true });

		const mockEvent = vi.fn();
		component.$on('cancel', function (event) {
			mockEvent(event.detail);
		});

		const cancelBtn = await screen.findByText('Cancel');

		fireEvent.click(cancelBtn);

		expect(mockEvent).toHaveBeenCalled();
		expect(mockEvent).toHaveBeenCalledTimes(1);
	});

	it('should send cancel dispatch if click outside of div', async () => {
		const { container, component } = render(GameSearchAndSelect, { visible: true });

		const mockEvent = vi.fn();
		component.$on('cancel', function (event) {
			mockEvent(event.detail);
		});

		if (container.children[0]?.children[0]) {
			fireEvent.click(container.children[0].children[0]);
		}

		expect(mockEvent).toHaveBeenCalled();
		expect(mockEvent).toHaveBeenCalledTimes(1);
	});
});

describe('hidden game search', () => {
	it('should not render visible', () => {
		render(GameSearchAndSelect, { visible: false });
		expect(screen.queryByText('Game Search:')).not.toBeInTheDocument();
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
};

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
	};
};

const platforms = ['Steam', 'Switch', 'PS5', 'Series S/X', 'Android', 'iOS'];
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
	'Visual Novel',
];
