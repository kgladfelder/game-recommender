import { Chance } from 'chance';
import type { RequestHandler } from './$types';
import { GET } from './+server';

describe('game search', () => {
    const chance = new Chance();
    let id: string;
    
    beforeEach(() => {
        id = chance.natural().toString();
    });
    
    it('should run', () => {
        // const response = GET({ url: new URL('hltb.com?id=1') })
        expect(false);
    });
});