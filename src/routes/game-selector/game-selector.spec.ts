import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import GameSelector from './+page.svelte';

describe('should render the home page', () => {
	it('shows proper heading when rendered', () => {
		render(GameSelector);
		const heading = screen.getByText('Welcome to Game Recommender');
		expect(heading).toBeInTheDocument();
	});
});
