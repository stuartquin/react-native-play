'use strict';
import {Map, List} from 'immutable';

const fetchTags = (prefix, tags) => {
  if (prefix) {
    return tags.filter(t => t.startsWith(prefix)); 
  }
  return List();
};

export default function(state = Map(), action) {
  switch(action.type) {
    case 'ADD_THOUGHT':
      return state.set('thoughts', state.get('thoughts').concat([action.value]));
    case 'SUGGEST_TAGS':
      return state.set('suggestedTags', fetchTags(action.value, state.get('existingTags')));
  }

  return Map({
    thoughts: List(),
    existingTags: List(['hello', 'help', 'contact', 'note', 'cool', 'reminder']),
    suggestedTags: List(),
  });
}
