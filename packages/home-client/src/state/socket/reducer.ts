import { Reducer } from 'redux';

const jsondiffpatch = require('jsondiffpatch');

const socketReducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    case '@@SERVER/UPDATE_STATE': {
      return action.payload;
    }
    case '@@SERVER/PATCH_STATE': {
      return jsondiffpatch.patch(state, action.payload);
    }
    default: {
      return state;
    }
  }
}

export default socketReducer;