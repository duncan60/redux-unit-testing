import {List, Map} from 'immutable';

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

export function setEntries(state, entries) {
    return {
        ...state,
        entries: [
            ...state['entries'],
            ...entries
        ]
    };
}
export function next(state) {
    const {
        entries
    } = state;
    let pair = entries.filter((item, idx) => {
            return idx < 2;
        }),
        entrie = entries.filter((item, idx) => {
            return idx >= 2;
        });
    return {
        vote:{
            pair
        },
        entries: entrie
    }
}
export function vote(state, entry) {
    let tally = state.vote.hasOwnProperty('tally') ? state.vote['tally'] : {};
    tally = {
        ...tally,
        [entry]: tally.hasOwnProperty(entry) ? tally[entry] + 1 : 1
    }
    return {
        ...state,
        vote: {
            ...state['vote'],
            tally
        }
    };
}