/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import itunesContainerSaga, { getItune, getItunesData } from '../saga';
import { itunesContainerTypes } from '../reducer';
import { apiResponseGenerator } from '@utils/testUtils';
import { getItunes, getItunesDetail } from '@services/ituneApi';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const ituneName = 'test';
  const id = 1544494392;
  let getItunesDataGenerator = getItunesData({ ituneName });
  let getItuneDetailGenerator = getItune({ id });

  // Tests - ItunesData
  it('should start task to watch for REQUEST_GET_ITUNES_DATA action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ITUNES_DATA, getItunesData));
  });

  it('should ensure that the action FAILURE_GET_ITUNES_DATA is dispatched when the api call fails', () => {
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getItunes, ituneName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching itune informations.'
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_ITUNES_DATA,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_DATA is dispatched when the api call succeeds', () => {
    getItunesDataGenerator = getItunesData({ ituneName });
    const res = getItunesDataGenerator.next().value;
    expect(res).toEqual(call(getItunes, ituneName));
    const itunesResponse = {
      resultCount: 1,
      resuls: [{ ituneName }]
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(true, itunesResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_ITUNES_DATA,
        data: itunesResponse
      })
    );
  });

  // Tests - Itune
  it('should start task to watch for REQUEST_GET_ITUNE action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ITUNE, getItune));
  });

  it('should ensure that the action FAILURE_GET_ITUNE_DETAIL is dispatched when the api call fails', () => {
    const res = getItuneDetailGenerator.next().value;
    expect(res).toEqual(call(getItunesDetail, id));
    const errorResponse = {
      errorMessage: 'There was an error while fetching itune informations.'
    };
    expect(getItuneDetailGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_ITUNE_DETAIL,
        ituneDetailError: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE_DETAIL is dispatched when the api call succeeds', () => {
    getItuneDetailGenerator = getItune({ id });
    const res = getItuneDetailGenerator.next().value;
    expect(res).toEqual(call(getItunesDetail, id));
    const itunesResponse = {
      resultCount: 1,
      results: [{ artistId: id }]
    };
    const updatedData = itunesResponse.results[0];
    expect(getItuneDetailGenerator.next(apiResponseGenerator(true, itunesResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_ITUNE_DETAIL,
        ituneDetail: updatedData
      })
    );
  });
});
