import { initialState } from '../reducer';
import { selectItunesContainerDomain } from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      itunesContainer: {}
    };
  });

  it('should select the user state', () => {
    expect(selectItunesContainerDomain(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should select the global state', () => {
    const selector = selectItunesContainerDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
