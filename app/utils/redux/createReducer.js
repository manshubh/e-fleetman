import { createStore } from 'redux';

/**
 *
 * @param {*} reducer
 */
export const createReducer = reducer => (state = {}, action) => {
  if (typeof reducer[action.type] === 'function') {
    return reducer[action.type](state, action);
  }
  return state;
};

