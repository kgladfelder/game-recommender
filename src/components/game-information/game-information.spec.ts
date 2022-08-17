import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte'
import { Chance } from 'chance';

import { Genre, Platform } from '../../types';

import GameInformation from './index.svelte';


const getGenreKeys = () => {
    return Object.keys(Genre).map(parseFloat);
}

const getPlatformKeys = () => {
    return Object.keys(Platform).map(parseFloat);
}

describe('should render properly when visibility is set', () => {
    const chance = new Chance();

    it('shows when rendered as visible', () => {
        render(GameInformation, { visible: true });

        expect(screen.getByText(/Game Information/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Game Name/)).toHaveValue("");
        expect(screen.getByLabelText(/Developer/)).toHaveValue("");
        expect(screen.getByLabelText(/Publisher/)).toHaveValue("");
        expect(screen.getByLabelText(/^Main Story$/)).toHaveValue(null);
        expect(screen.getByLabelText(/Main Story \+ Extras/)).toHaveValue(null);
        expect(screen.getByLabelText(/Completionist/)).toHaveValue(null);
        for (const platform of getPlatformKeys().filter((x) => !isNaN(x))) {
            if (Platform[platform] === 'Unknown') { continue; }
            expect(screen.getByLabelText(Platform[platform])).not.toBeChecked();
        }
        for (const genre of getGenreKeys().filter((x) => !isNaN(x))) {
            if (Genre[genre] === 'Undefined') { continue; }
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
            developer: chance.word()
        }

        render(GameInformation, props);

        expect(screen.getByText(/Game Information/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Game Name/)).toHaveValue(props.gameName);
        expect(screen.getByLabelText(/Developer/)).toHaveValue(props.developer);
        expect(screen.getByLabelText(/Publisher/)).toHaveValue(props.publisher);
        expect(screen.getByLabelText(/^Main Story$/)).toHaveValue(props.mainStory);
        expect(screen.getByLabelText(/Main Story \+ Extras/)).toHaveValue(props.mainExtras);
        expect(screen.getByLabelText(/Completionist/)).toHaveValue(props.completionist);
        for (const platform of getPlatformKeys().filter((x) => !isNaN(x))) {
            if (Platform[platform] === 'Unknown') { continue; }
            if (props.platform === platform) {
                expect(screen.getByLabelText(Platform[platform])).toBeChecked();
            } else {
                expect(screen.getByLabelText(Platform[platform])).not.toBeChecked();
            }
        }
        for (const genre of getGenreKeys().filter((x) => !isNaN(x))) {
            if (Genre[genre] === 'Undefined') { continue; }
            if (props.genres.includes(genre)) {
                expect(screen.getByLabelText(Genre[genre])).toBeChecked();
            } else {
                expect(screen.getByLabelText(Genre[genre])).not.toBeChecked();
            }
        }

    });

    //TODO: Test changing values

    //TODO: Test cancel button

    //TODO: Test submit button
});

describe("should be empty if not visible", () => {
    it('should have no values when empty', () => {
        render(GameInformation, { visible: false });
        expect(screen.queryByText(/Game Informatin/i)).not.toBeInTheDocument();
    })
});