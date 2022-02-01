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

  it('should set the baseurl as / for uat environment', () => {
    let baseUrl = '';
    process.env.ENVIRONMENT_NAME = 'uat';
    const route = '/';
    const pathname = '/feat/test/';

    baseUrl = pathname.substring(0, pathname.length - route.length);

    expect(baseUrl).toEqual('/feat/test');
  });

  it('should set the baseurl as /tracks/123456 for uat environment', () => {
    let baseUrl = '';
    process.env.ENVIRONMENT_NAME = 'uat';
    const route = '/tracks/123456';
    const pathname = '/feat/test/tracks/123456/';

    baseUrl = pathname.substring(0, pathname.length - route.length - 1);

    expect(baseUrl).toEqual('/feat/test');
  });
});
