// import produce from 'immer'
import { itunesContainerReducer, itunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_ITUNE is dispatched', () => {
    const ituneName = 'test';
    const expectedResult = { ...state, ituneName };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_ITUNES_DATA,
        ituneName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_ITUNE_SUCCESS is dispatched', () => {
    const data = { name: 'test' };
    const expectedResult = { ...state, itunesData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_ITUNES_DATA,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_ITUNE_ERROR is dispatched', () => {
    const error = 'something went wrong';
    const expectedResult = { ...state, itunesError: error };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_ITUNES_DATA,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_ITUNES_DATA is dispatched', () => {
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_ITUNES_DATA
      })
    ).toEqual(initialState);
  });
});
