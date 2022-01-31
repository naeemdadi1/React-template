/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = {
  ituneName: null,
  itunesData: {},
  itunesError: null,
  id: null,
  ituneDetail: {},
  ituneDetailError: null
};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetItunesData: ['ituneName'],
  successGetItunesData: ['data'],
  failureGetItunesData: ['error'],
  requestGetItune: ['id'],
  successGetItuneDetail: ['ituneDetail'],
  failureGetItuneDetail: ['ituneDetailError'],
  clearItunesData: null,
  clearItuneDetails: null
});

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
      case itunesContainerTypes.REQUEST_GET_ITUNE:
        draft.id = action.id;
        break;
      case itunesContainerTypes.SUCCESS_GET_ITUNE_DETAIL:
        draft.ituneDetail = action.ituneDetail;
        break;
      case itunesContainerTypes.FAILURE_GET_ITUNE_DETAIL:
        draft.ituneDetailError = get(action.ituneDetailError, 'message', 'something went wrong');
        break;
      case itunesContainerTypes.CLEAR_ITUNES_DATA:
        draft.ituneName = null;
        draft.itunesError = null;
        draft.itunesData = {};
        break;
      case itunesContainerTypes.CLEAR_ITUNE_DETAILS:
        draft.id = null;
        draft.ituneDetail = {};
        draft.ituneDetailError = null;
        break;
    }
  });

export default itunesContainerReducer;
