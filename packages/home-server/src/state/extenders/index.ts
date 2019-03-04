import path from 'path';
import { Reducer } from 'redux';
import { Reducer as Extender } from '@home/sdk';

const extenderReducer = (reducer: Reducer, extenders: {[name: string]: Extender}): Reducer => {
  const extenderNames = Object.keys(extenders);
  const normalizedExtenders: {[name: string]: (state: any) => any} = {};
  extenderNames.reduce((output, name) => {
    if (typeof extenders[name] === 'function') {
      output[name] = extenders[name] as any;
    } else {
      const location = path.resolve(extenders[name] as string);
      const imported = require(location);
      output[name] = imported.default || imported;
    }
    return output;
  }, normalizedExtenders);

  return (state = {}, action) => {
    const newState = reducer(state.data, action);
    const extended = extenderNames.reduce((output, name) => ({
      ...output,
      [name]: normalizedExtenders[name](newState),
    }), {});

    return {
      data: newState,
      extended
    };
  };
}

export default extenderReducer;