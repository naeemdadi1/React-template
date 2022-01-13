/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case itunesContainerTypes.DEFAULT_ACTION:
        return { ...state, somePayload: action.somePayload };
      default:
        return state;
    }
  });

export default itunesContainerReducer;
