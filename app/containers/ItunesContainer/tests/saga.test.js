/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import itunesContainerSaga, { getItunesData } from '../saga';
import { itunesContainerTypes } from '../reducer';
import { getItunes } from '@app/services/repoApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const ituneName = 'test';
  let getItunesDataGenerator = getItunesData({ ituneName });

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
});
