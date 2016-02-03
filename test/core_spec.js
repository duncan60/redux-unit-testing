import {List, Map} from 'immutable';
import { expect } from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = {entries:[]};
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.deep.equal({
                entries: ['Trainspotting', '28 Days Later']
            });
        });
        it('converts to immutable', () => {
            const state = {entries:[]};
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.deep.equal({
                entries: ['Trainspotting', '28 Days Later']
            });
        });
    });
    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = {
                entries: ['Trainspotting', '28 Days Later', 'Sunshine']
            };
            const nextState = next(state);
            expect(nextState).to.deep.equal({
                vote: {
                    pair: ['Trainspotting', '28 Days Later']
                },
                entries: ['Sunshine']
            });
        });
        // it('puts winner of current vote back to entries', () => {
        //     const state = {
        //         vote:{
        //             pair: ['Trainspotting', '28 Days Later'],
        //             tally: {
        //                 'Trainspotting': 4,
        //                 '28 Days Later': 2
        //             }
        //         },
        //         entries: ['Sunshine', 'Millions', '127 Hours']
        //     };
        //     const nextState = next(state);
        //     expect(nextState).to.deep.equal({
        //         vote: {
        //             pair: ['Sunshine', 'Millions']
        //         },
        //         entries: ['127 Hours', 'Trainspotting']
        //     }));
        // };

        // it('puts both from tied vote back to entries', () => {
        //     const state = {
        //         vote: {
        //             pair: ['Trainspotting', '28 Days Later'],
        //             tally: {
        //                 'Trainspotting': 3,
        //                 '28 Days Later': 3
        //             }
        //         },
        //         entries: ['Sunshine', 'Millions', '127 Hours']
        //     });
        //     const nextState = next(state);
        //     expect(nextState).to.deep.equal({
        //         vote:{
        //             pair: ['Sunshine', 'Millions']
        //         },
        //         entries: ['127 Hours', 'Trainspotting', '28 Days Later']
        //     });
        //  });
        // it('marks winner when just one entry left', () => {
        //     const state = {
        //         vote: {
        //             pair: ['Trainspotting', '28 Days Later'],
        //             tally: {
        //                 'Trainspotting': 4,
        //                 '28 Days Later': 2
        //             }
        //         },
        //         entries: []
        //     });
        //     const nextState = next(state);
        //     expect(nextState).to.deep.equal({
        //         winner: 'Trainspotting'
        //     });
        // });
    });
    describe( 'vote' , () => {
        it( 'creates a tally for the voted entry' , () => {
            const state = {
                vote: {
                    pair : ['Trainspotting' , '28 Days Later'],
                    tally: {}
                },
                entries: []
            };
            const nextState = vote(state, 'Trainspotting' );
            expect(nextState).to.deep.equal({
                vote: {
                    pair: ['Trainspotting' , '28 Days Later'],
                    tally: {
                        'Trainspotting': 1
                    }
                },
                entries: []
            });
        });

        it( 'adds to existing tally for the voted entry' , () => {
            const state = {
                vote: {
                    pair: ['Trainspotting' , '28 Days Later'],
                    tally: {
                        'Trainspotting' : 3 ,
                        '28 Days Later' : 2
                    }
                },
                entries: []
            };
            const nextState = vote(state, 'Trainspotting' );
            expect(nextState).to.deep.equal({
                vote: {
                    pair: ['Trainspotting' , '28 Days Later'],
                    tally: {
                        'Trainspotting' : 4 ,
                        '28 Days Later' : 2
                    }
                },
                entries: []
            });
        });
    });
});