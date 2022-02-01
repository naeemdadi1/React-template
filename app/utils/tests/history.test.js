// import { baseUrl } from '../history';
import history from '../history';

describe('Tests for baseUrl method in history', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  it('should the path / in production', () => {
    process.env.NODE_ENV = 'production';
    expect(history.location.pathname).toEqual('/');
  });

  it('should the path / in development or test mode', () => {
    expect(history.location.pathname).toEqual('/');
  });
});
