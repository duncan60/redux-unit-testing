import { expect } from 'chai';

describe('immutability', () => {
    describe('numbers', () => {
        function increment(currentState) {
            return currentState + 1;
        }
        it('are immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });

    describe('List', () => {
        function addMovie(currentState, movie) {
            return [
                ...currentState,
                movie
            ];
        }
        it('are immutable', () => {
            let state = ['Trainspotting', '28 Days Later'];
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.deep.equal([
                'Trainspotting',
                '28 Days Later',
                'Sunshine'
            ]);
            expect(state).to.deep.equal([
                'Trainspotting',
                '28 Days Later'
            ]);
        });
    });


    describe('tree', () => {
        function addMovie(currentState, movie) {
            return {
                movies: [
                    ...currentState['movies'],
                    movie
                ]
            };
        }
        it('are immutable', () => {
            let state = {
                movies: ['Trainspotting', '28 Days Later']
            };
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.deep.equal({
                movies: [
                    'Trainspotting',
                    '28 Days Later',
                    'Sunshine'
                ]
            });
            expect(state).to.deep.equal({
                movies:[
                    'Trainspotting',
                    '28 Days Later'
                ]
            });
        });
    });
});
