/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import itunesContainerSaga, { defaultFunction } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.DEFAULT_ACTION, defaultFunction));
  });

  it('should ensure that default function is dispatched when the API call succeeds', () => {
    expect(defaultFunction().next().value).toEqual(undefined);
  });
});
