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
  }),
  Map({
    start: 150000,
    end: null,
    rate: 45.0
  })
]);
const ADDITIONAL = 45;

const getBands = (taxable) => {
  return BANDS.map((band) => {
    const start = band.get('start');

    let amount = taxable - start;
    if (band.get('end')) {
      amount = Math.min(amount, band.get('end') - start);
    }
    return (amount / 100.0) * band.get('rate');
  });
};

const computeSummary = (salary) => {
  const taxable = Math.max(0, salary - BASIC);
  return Map({
    salary: salary,
    allowance: BASIC,
    taxable: taxable,
    bands: BANDS,
    taxDue: getBands(taxable)
  });
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
