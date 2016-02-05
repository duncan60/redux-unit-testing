import {expect} from 'chai';
import reducer from '../src/reducer';
import { INITIAL_STATE } from '../src/core';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const state = INITIAL_STATE;
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']}
        const nextState = reducer(state, action);

        expect(nextState).to.deep.equal({
            entries: ['Trainspotting'],
            vote   : {
                pair : [],
                tally: {}
            },
            winner: ''
        });
    });

    it('hendles NEXT', () => {
        const state = {
            ...INITIAL_STATE,
            entries : ['Trainspotting', '28 Days Later']
        };
        const action = {type: 'NEXT'};
        const nextState = reducer(state, action);
        expect(nextState).to.deep.equal({
            vote: {
                pair : ['Trainspotting', '28 Days Later'],
                tally: {}
            },
            entries: [],
            winner : ''
        });
    });

    it('hendles VOTE', () => {
        const state = {
            ...INITIAL_STATE,
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            }
        };
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(state, action);

        expect(nextState).to.deep.equal({
            ...INITIAL_STATE,
            vote: {
                pair : ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting : 1 }
            },
            entries: []
        });
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(undefined, action);

        expect(nextState).to.deep.equal({
            entries: [ 'Trainspotting' ],
            vote   : {
                pair : [],
                tally: {}
            },
            winner: ''
        });
    });

    it('can be used with reduce', () => {
        const actions = [
            { type: 'SET_ENTRIES', entries: ['Trainspotting', '28  Days  Later']},
            { type: 'NEXT'},
            { type: 'VOTE', entry: 'Trainspotting'},
            { type: 'VOTE', entry: '28  Days  Later'},
            { type: 'VOTE', entry: 'Trainspotting'},
            { type: 'NEXT'}
        ];
        let finalState = INITIAL_STATE
        actions.forEach((action)=> {
            let state = reducer(finalState, action);
            finalState = {
                ...state
            };
        });

        expect(finalState).to.deep.equal({
            entries: [],
            vote   : {
                pair : ['Trainspotting', '28  Days  Later'],
                tally: {
                    'Trainspotting'  : 2,
                    '28  Days  Later': 1
                }
            },
            winner: 'Trainspotting'
        });
    });
});