/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = { ituneName: null, itunesData: {}, itunesError: null };

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetItunesData: ['ituneName'],
  successGetItunesData: ['data'],
  failureGetItunesData: ['error'],
  clearItunesData: {}
});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_ITUNES_DATA:
        draft.ituneName = action.ituneName;
        break;
      case itunesContainerTypes.SUCCESS_GET_ITUNES_DATA:
        draft.itunesData = action.data;
        break;
      case itunesContainerTypes.FAILURE_GET_ITUNES_DATA:
        draft.itunesError = get(action.error, 'message', 'something went wrong');
        break;
      case itunesContainerTypes.CLEAR_ITUNES_DATA:
        draft.ituneName = null;
        draft.itunesError = null;
        draft.itunesData = {};
        break;
    }
  });

export default itunesContainerReducer;
