'use strict';

import {Map, List} from 'immutable';

const BASIC = 10600;
const BANDS = List([
  Map({
    start: 0,
    end: 31865,
    rate: 20.0
  }),
  Map({
    start: 31866,
    end: 150000,
    rate: 40.0
  })
]);
const ADDITIONAL = 45;

const computeSummary = (salary) => {
  const results = Map({
    salary: salary,
    allowance: BASIC,
    taxable: salary - BASIC
  });
  results.set('bands', BANDS.map((band) => {
    const start = band.get('start');
    const end = band.get('end');
    const amount = Math.min(results.get('taxable') - start, end - start);
    return (amount / 100.0) * band.get('rate');
  }));

  return results;
};

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
