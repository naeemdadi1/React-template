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

  // Tests for ItunesContainer Selectors
  it('should return the initial state when an action of type GET_ITUNES_DATA is dispatched', () => {
    const ituneName = 'test';
    const expectedResult = { ...state, ituneName };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_ITUNES_DATA,
        ituneName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when SUCCESS_GET_ITUNES_DATA is dispatched', () => {
    const data = { name: 'test' };
    const expectedResult = { ...state, itunesData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_ITUNES_DATA,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when ERROR_GET_ITUNES_DATA is dispatched', () => {
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

  // Tests for ItunesDetail Container's selectors
  it('should return the initial state when an action of type GET_ITUNE is dispatched', () => {
    const id = 1544494392;
    const expectedResult = { ...state, id };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_ITUNE,
        id
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when SUCCESS_GET_ITUNE_DETAIL is dispatched', () => {
    const data = { name: 'test' };
    const expectedResult = { ...state, ituneDetail: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_ITUNE_DETAIL,
        ituneDetail: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FAILURE_GET_ITUNE_DETAIL  is dispatched', () => {
    const error = 'something went wrong';
    const expectedResult = { ...state, ituneDetailError: error };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_ITUNE_DETAIL,
        ituneDetailError: error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_ITUNE_DETAILS is dispatched', () => {
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_ITUNE_DETAILS
      })
    ).toEqual(initialState);
  });
});
