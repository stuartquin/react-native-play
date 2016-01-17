'use strict';

export default function(state = Map(), action) {
  switch(action.type) {
    case 'ADD_THOUGHT':
      return {
        thoughts: state.thoughts.concat([action.value])
      };
  }

  return  {
    thoughts: []
  };
}
