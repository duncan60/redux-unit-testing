import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState = {};
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']}
        const nextState = reducer(initialState, action);

        expect(nextState).to.deep.equal({
            entries: ['Trainspotting']
        });
    });

    it('hendles NEXT', () => {
        const initialState = {
            entries : ['Trainspotting' , '28 Days Later']
        };
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.deep.equal({
            vote: {
                pair : ['Trainspotting' , '28 Days Later'],
            },
            entries: []
        });
    });

    it('hendles VOTE', () => {
        const initialState = {
            vote: {
                pair: ['Trainspotting' , '28 Days Later']
            },
            entries: []
        };
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.deep.equal({
            vote: {
                pair : ['Trainspotting' , '28 Days Later'],
                tally: { Trainspotting : 1 }
            },
            entries: []
        });
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries : ['Trainspotting']};
        const nextState = reducer(undefined , action);

        expect(nextState).to.deep.equal({
            entries : [ 'Trainspotting' ]
        });
    });
});