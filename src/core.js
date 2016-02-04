let getWinners = (vote) => {
    if (!vote) return [];
    const [a, b] = vote['pair'];
    const aVotes = vote['tally'].hasOwnProperty(a) ? vote['tally'][a] : 0;
    const bVotes = vote['tally'].hasOwnProperty(b) ? vote['tally'][b] : 0;
    if (aVotes > bVotes) {
        return [a];
    } else if (aVotes < bVotes)  {
        return [b];
    } else {
        return [a, b];
    }
};

export const INITIAL_STATE = {};

export function setEntries(state, entries) {
    const oldEntries = state['entries'] ? state['entries'] : [];
    return {
        ...state,
        entries: [
            ...oldEntries,
            ...entries
        ]
    };
};
export function next(state) {
    const {
        entries,
        vote
    } = state;
    let winner     = vote ? getWinners(vote) : [],
        newEntries = [
        ...entries,
        ...winner
    ];

    if(newEntries.length === 1) {
        return {
            winner: winner[0]
        };
    } else {
        let pair   = newEntries.filter((item, idx) => idx < 2),
            entrie = newEntries.filter((item, idx) => idx >= 2);
        return {
            vote:{
                pair
            },
            entries: entrie
        };
    }
};
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
};
