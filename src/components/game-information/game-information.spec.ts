import '@testing-library/jest-dom';

import { act, fireEvent, render, screen } from '@testing-library/svelte';
import { Chance } from 'chance';

import { Genre, Platform } from '../../types';

import GameInformation from './index.svelte';

const getGenreKeys = () => {
	return Object.keys(Genre).map(parseFloat);
};

const getPlatformKeys = () => {
	return Object.keys(Platform).map(parseFloat);
};

describe('should render properly when visibility is set', () => {
	const chance = new Chance();

	it('shows when rendered as visible', () => {
		render(GameInformation, { visible: true });

		expect(screen.getByText(/Game Information/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Game Name/)).toHaveValue('');
		expect(screen.getByLabelText(/Developer/)).toHaveValue('');
		expect(screen.getByLabelText(/Publisher/)).toHaveValue('');
		expect(screen.getByLabelText(/^Main Story$/)).toHaveValue(null);
		expect(screen.getByLabelText(/Main Story \+ Extras/)).toHaveValue(null);
		expect(screen.getByLabelText(/Completionist/)).toHaveValue(null);
		for (const platform of getPlatformKeys().filter((x) => !isNaN(x))) {
			if (Platform[platform] === 'Unknown') {
				continue;
			}
			expect(screen.getByLabelText(Platform[platform])).not.toBeChecked();
		}
		for (const genre of getGenreKeys().filter((x) => !isNaN(x))) {
			if (Genre[genre] === 'Undefined') {
				continue;
			}
			expect(screen.getByLabelText(Genre[genre])).not.toBeChecked();
		}
	});

	it('shows prepopulated data when provided', () => {
		const props = {
			visible: true,
			gameName: chance.word(),
			mainStory: chance.normal({ mean: 30, dev: 5 }),
			mainExtras: chance.normal({ mean: 45, dev: 10 }),
			completionist: chance.normal({ mean: 100, dev: 25 }),
			genres: chance.pickset(getGenreKeys(), 3),
			platform: chance.pickone(getPlatformKeys()),
			publisher: chance.word(),
			developer: chance.word(),
		};

		render(GameInformation, props);

		expect(screen.getByText(/Game Information/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Game Name/)).toHaveValue(props.gameName);
		expect(screen.getByLabelText(/Developer/)).toHaveValue(props.developer);
		expect(screen.getByLabelText(/Publisher/)).toHaveValue(props.publisher);
		expect(screen.getByLabelText(/^Main Story$/)).toHaveValue(props.mainStory);
		expect(screen.getByLabelText(/Main Story \+ Extras/)).toHaveValue(props.mainExtras);
		expect(screen.getByLabelText(/Completionist/)).toHaveValue(props.completionist);
		for (const platform of getPlatformKeys().filter((x) => !isNaN(x))) {
			if (Platform[platform] === 'Unknown') {
				continue;
			}
			if (props.platform === platform) {
				expect(screen.getByLabelText(Platform[platform])).toBeChecked();
			} else {
				expect(screen.getByLabelText(Platform[platform])).not.toBeChecked();
			}
		}
		for (const genre of getGenreKeys().filter((x) => !isNaN(x))) {
			if (Genre[genre] === 'Undefined') {
				continue;
			}
			if (props.genres.includes(genre)) {
				expect(screen.getByLabelText(Genre[genre])).toBeChecked();
			} else {
				expect(screen.getByLabelText(Genre[genre])).not.toBeChecked();
			}
		}
	});

	it('should update game name', async () => {
		render(GameInformation, { visible: true });

		const newGameName = chance.word();
		const gameNameEl = screen.getByLabelText(/Game Name/);
		await act(() => {
			fireEvent.input(gameNameEl, { target: { value: newGameName } });
		});

		expect(screen.getByLabelText(/Game Name/)).toHaveValue(newGameName);
	});

	it('should update developer', async () => {
		render(GameInformation, { visible: true });

		const newDeveloper = chance.word();
		const developerEl = screen.getByLabelText(/Developer/);
		await act(() => {
			fireEvent.input(developerEl, { target: { value: newDeveloper } });
		});

		expect(screen.getByLabelText(/Developer/)).toHaveValue(newDeveloper);
	});

	it('should update publisher', async () => {
		render(GameInformation, { visible: true });

		const newPublisher = chance.word();
		const publisherEl = screen.getByLabelText(/Publisher/);
		await act(() => {
			fireEvent.input(publisherEl, { target: { value: newPublisher } });
		});

		expect(screen.getByLabelText(/Publisher/)).toHaveValue(newPublisher);
	});

	it('should update main story', async () => {
		render(GameInformation, { visible: true });

		const updatedHours = chance.natural({ min: 20, max: 100 });
		const mainStoryEl = screen.getByLabelText(/^Main Story$/);
		await act(() => {
			fireEvent.input(mainStoryEl, { target: { value: updatedHours } });
		});

		expect(screen.getByLabelText(/^Main Story$/)).toHaveValue(updatedHours);
	});

	it('should update main story + extras', async () => {
		render(GameInformation, { visible: true });

		const updatedHours = chance.natural({ min: 20, max: 100 });
		const mspeEl = screen.getByLabelText(/Main Story \+ Extras/);
		await act(() => {
			fireEvent.input(mspeEl, { target: { value: updatedHours } });
		});

		expect(screen.getByLabelText(/Main Story \+ Extras/)).toHaveValue(updatedHours);
	});

	it('should update completionist', async () => {
		render(GameInformation, { visible: true });

		const updatedHours = chance.natural({ min: 20, max: 100 });
		const compEl = screen.getByLabelText(/Completionist/);
		await act(() => {
			fireEvent.input(compEl, { target: { value: updatedHours } });
		});

		expect(screen.getByLabelText(/Completionist/)).toHaveValue(updatedHours);
	});

	it('should update platform', async () => {
		render(GameInformation, { visible: true });

		let platformChoice = chance.pickone(getPlatformKeys());
		while (Platform[platformChoice] === 'Unknown' || isNaN(platformChoice)) {
			platformChoice = chance.pickone(getPlatformKeys());
		}

		const platformEl = screen.getByLabelText(Platform[platformChoice]);

		expect(platformEl).not.toBeChecked();

		await act(() => {
			fireEvent.click(platformEl);
		});

		expect(screen.getByLabelText(Platform[platformChoice])).toBeChecked();
	});

	it('should update genre', async () => {
		render(GameInformation, { visible: true });

		let genreChoice = chance.pickone(getGenreKeys());
		while (Genre[genreChoice] === 'Undefined' || isNaN(genreChoice)) {
			genreChoice = chance.pickone(getGenreKeys());
		}

		const genreEl = screen.getByLabelText(Genre[genreChoice]);

		expect(genreEl).not.toBeChecked();

		await act(() => {
			fireEvent.click(genreEl);
		});

		expect(screen.getByLabelText(Genre[genreChoice])).toBeChecked();
	});

	//TODO: Test cancel button
	it('should send cancel dispatch if cancel button is pressed', async () => {
		render(GameInformation, { visible: true });
	});

	//TODO: Test submit button
    it('should send the game dispatch if the submit button is clicked', async () => {
        const props = {
			visible: true,
			gameName: chance.word(),
			mainStory: chance.normal({ mean: 30, dev: 5 }),
			mainExtras: chance.normal({ mean: 45, dev: 10 }),
			completionist: chance.normal({ mean: 100, dev: 25 }),
			genres: chance.pickset(getGenreKeys(), 3),
			platform: chance.pickone(getPlatformKeys()),
			publisher: chance.word(),
			developer: chance.word(),
		};

		render(GameInformation, props);
    });
});

describe('should be empty if not visible', () => {
	it('should have no values when empty', () => {
		render(GameInformation, { visible: false });
		expect(screen.queryByText(/Game Informatin/i)).not.toBeInTheDocument();
	});
});
