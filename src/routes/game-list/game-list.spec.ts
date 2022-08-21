import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import GameList from './+page.svelte';

describe('should render the home page', () => {
	it('shows rendered', () => {
		render(GameList);
	});
});
