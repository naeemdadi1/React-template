import { initialState } from '../reducer';

import makeSelectItunesContainer, {
  selectItuneDetail,
  selectItuneDetailError,
  selectItuneName,
  selectItunesContainerDomain,
  selectItunesData,
  selectItunesError
} from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState, ituneName, itunesData, itunesError, id, ituneDetail, ituneDetailError;

  beforeEach(() => {
    ituneName = 'test';
    itunesError = 'Something is wrong';
    itunesData = { resultCount: 1, results: [{ ituneName }] };
    id = 1544494392;
    ituneDetail = { ituneName };
    ituneDetailError = 'Someting is wrong';

    mockedState = {
      itunesContainer: {
        ituneName,
        itunesData,
        itunesError,
        id,
        ituneDetail,
        ituneDetailError
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

  it('should select the ituneDetail', () => {
    const itunesSelector = selectItuneDetail();
    expect(itunesSelector(mockedState)).toEqual(ituneDetail);
  });

  it('should select the itunesError', () => {
    const itunesSelector = selectItuneDetailError();
    expect(itunesSelector(mockedState)).toEqual(ituneDetailError);
  });

  it('should select the global state', () => {
    expect(selectItunesContainerDomain(initialState)).toEqual(initialState);
  });
});
