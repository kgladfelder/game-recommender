import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import GameSelector from './+page.svelte';

describe('should render the home page', () => {
	it('shows rendered', () => {
		render(GameSelector);
	});
});
