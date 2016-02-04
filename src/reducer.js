import { setEntries, next, vote, INITIAL_STATE } from './core';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_ENTRIES':
			return {
				...state,
				entries: setEntries(state.entries, action.entries)
			};
		case 'NEXT':
			return next(state);
		case 'VOTE':
			return {
				...state,
				vote: vote(state['vote'], action.entry)
			};
	}
	return state;
};
