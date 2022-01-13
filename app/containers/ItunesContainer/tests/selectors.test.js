import { initialState } from '../reducer';
import makeSelectItunesContainer, { selectItunesContainerDomain } from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      itunesContainer: {}
    };
  });

  // it('should select the user state', () => {
  //   expect(selectItunesContainerDomain(mockedState)).toEqual(mockedState.itunesContainer);
  // });

  it('should select the global state', () => {
    expect(selectItunesContainerDomain(initialState)).toEqual(initialState);
  });

  it('should select the homeContainer state', () => {
    const selector = makeSelectItunesContainer();
    expect(selector(mockedState)).toEqual(mockedState.itunesContainer);
  });
});
