import { Reducer } from 'redux';

const extenderReducer = (reducer: Reducer): Reducer => (state = {}, action) => {
  const newState = reducer(state.data, action);

  return {
    data: newState,
  };
};

export default extenderReducer;