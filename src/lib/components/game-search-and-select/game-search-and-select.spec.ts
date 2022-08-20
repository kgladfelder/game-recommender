import '@testing-library/jest-dom';

import { act, fireEvent, render, screen } from '@testing-library/svelte';
import { Chance } from 'chance';

import { Genre, Platform, type Game } from '$lib/types';

import GameSearchAndSelect from './index.svelte';

describe('game search', () => {
	it('should render visible', () => {
		render(GameSearchAndSelect, { visible: true });
	});

	it('should not render visible', () => {
		render(GameSearchAndSelect, { visible: false });
	});
});
