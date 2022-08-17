import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import Layout from './__layout.svelte';

describe('should show the navigation bar in layout', () => {
	test('shows proper links when rendered', () => {
		render(Layout);
		const home = screen.getByText('Home');
		const list = screen.getByText('Games List');
		const rec = screen.getByText('Game Selector');
		expect(home).toBeInTheDocument();
		expect(list).toBeInTheDocument();
		expect(rec).toBeInTheDocument();
	});
});
