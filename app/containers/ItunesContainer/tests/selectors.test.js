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
});
