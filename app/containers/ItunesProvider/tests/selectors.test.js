import { initialState } from '../reducer';

import makeSelectItunesContainer, {
  selectItuneName,
  selectItunesContainerDomain,
  selectItunesData,
  selectItunesError
} from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let ituneName;
  let itunesData;
  let itunesError;

  beforeEach(() => {
    ituneName = 'test';
    itunesError = 'Something is wrong';
    itunesData = { resultCount: 1, results: [{ ituneName }] };

    mockedState = {
      itunesContainer: {
        ituneName,
        itunesData,
        itunesError
      }
    };
  });

  it('should select the homeContainer state', () => {
    const selector = makeSelectItunesContainer();
    expect(selector(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should select the ituneName', () => {
    const itunesSelector = selectItuneName();
    expect(itunesSelector(mockedState)).toEqual(ituneName);
  });

  it('should select the itunesData', () => {
    const itunesSelector = selectItunesData();
    expect(itunesSelector(mockedState)).toEqual(itunesData);
  });

  it('should select the itunesError', () => {
    const itunesSelector = selectItunesError();
    expect(itunesSelector(mockedState)).toEqual(itunesError);
  });

  it('should select the global state', () => {
    expect(selectItunesContainerDomain(initialState)).toEqual(initialState);
  });
});
