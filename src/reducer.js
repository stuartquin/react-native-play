'use strict';


export default function(state = Map(), action) {
  switch(action.type) {
    case 'SET_SALARY':
      return state.merge({
        salary: action.value,
        summary: computeSummary(action.value)
      });
  }

  return Map({
    salary: null,
    summary: Map({})
  });
}
