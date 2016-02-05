import { expect } from 'chai';
import makeStore from '../src/store';
import { INITIAL_STATE } from '../src/core';

describe('store', () => {
    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();

        expect(store.getState()).to.deep.equal({
            ...INITIAL_STATE
        });

        store.dispatch({
            type   : 'SET_ENTRIES',
            entries: ['Trainspotting', '28 Days Later']
        });

        expect(store.getState()).to.deep.equal({
            ...INITIAL_STATE,
            entries: ['Trainspotting', '28 Days Later']
        });
    });
});