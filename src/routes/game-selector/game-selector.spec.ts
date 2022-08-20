import { render } from '@testing-library/svelte';

import GameSelector from './+page.svelte';

describe('should render the game selector page', () => {
	it('shows rendered', () => {
		render(GameSelector);
	});
});
