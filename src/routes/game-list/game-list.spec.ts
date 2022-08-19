import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import GameList from './+page.svelte';

describe('should render the home page', () => {
	it('shows proper heading when rendered', () => {
		render(GameList);
		const heading = screen.getByText('Welcome to Game Recommender');
		expect(heading).toBeInTheDocument();
	});
});
