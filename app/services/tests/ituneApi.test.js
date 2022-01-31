import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getItunes, getItunesDetail } from '../ituneApi';

describe('ItuneApi tests', () => {
  const ituneName = 'test';
  const ituneId = 1544494392;

  it('should make the api call to "/search?term=${ituneName}&media=music', async () => {
    const mock = new MockAdapter(getApiClient('itune').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ ituneName }]
      }
    ];
    mock.onGet(`/search?term=${ituneName}&media=music`).reply(200, data);
    const res = await getItunes(ituneName);
    expect(res.data).toEqual(data);
  });

  it('should make the api call to "/lookup?id=${ituneId}&media=music', async () => {
    const mock = new MockAdapter(getApiClient('itune').axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ ituneId }]
      }
    ];
    mock.onGet(`/lookup?id=${ituneId}&media=music`).reply(200, data);
    const res = await getItunesDetail(ituneId);
    expect(res.data).toEqual(data);
  });
});
