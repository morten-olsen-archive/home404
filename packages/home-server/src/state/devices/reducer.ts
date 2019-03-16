import { Reducer } from 'redux';
import { Device } from '@home/sdk';
import console = require('console');

const deviceReducer: Reducer<Device[]> = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case '@@DEVICES/ADD': {
      return [
        ...state, {
          owner: action.meta.owner,
          id: action.meta.id,
          info: action.payload,
          state: {},
        }
      ];
    }
    case '@@DEVICES/UPDATE_STATE': {
      return state.map((item) => {
        if (item.owner === action.meta.owner && item.id === action.meta.id) {
          return {
            ...item,
            state: action.payload,
          };
        }
        return item;
      });
    }
    case '@@DEVICES/UPDATE_INFO': {
      return state.map((item) => {
        if (item.owner === action.meta.owner && item.id === action.meta.id) {
          return {
            ...item,
            info: action.payload,
          };
        }
        return item;
      });
    }
    case '@@DEVICES/REMOVE': {
      return state.filter((item) => !(item.owner === action.meta.owner && item.id === action.meta.id));
    }
    default: {
      return state;
    }
  }
};

export default deviceReducer;