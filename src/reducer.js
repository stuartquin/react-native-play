'use strict';

function setState(state, newState) {
  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch(action.type) {
    case 'SET_MOVIE_RATING':
      return setState(state, action.state);
  }

  return state;
}
