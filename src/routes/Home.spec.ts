import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import Home from './index.svelte';

describe('should render the home page', () => {
	it('shows proper heading when rendered', () => {
		render(Home);
		const heading = screen.getByText('Welcome to Game Recommender');
		expect(heading).toBeInTheDocument();
	});
});
