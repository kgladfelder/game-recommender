import '@testing-library/jest-dom';

import { act, fireEvent, render, screen } from '@testing-library/svelte';
import { Chance } from 'chance';

import { Genre, Platform, type Game } from '$lib/types';

import GameSearchAndSelect from './index.svelte';

describe('game search', () => {
    it('should render', () => {
        render(GameSearchAndSelect);
    })
});