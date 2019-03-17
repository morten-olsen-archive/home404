import { Reducer } from 'redux';

const jsondiffpatch = require('jsondiffpatch');

const reducer: Reducer = (state: {}, action) => {
  switch (action.type) {
    case '@@SOCKET/UPDATE_STORE': {
      return action.payload;
    }
    case '@@SOCKET/PATCH_STORE': {
      return jsondiffpatch.patch(state, action.payload);
    }
    default: {
      return state;
    }
  }
}

export default reducer;