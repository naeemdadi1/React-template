import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getItunes } from '../ituneApi';

describe('ItuneApi tests', () => {
  const ituneName = 'test';
  it('should make the api call to "/search?term=&media=music', async () => {
    const mock = new MockAdapter(getApiClient('itune').axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ ituneName }]
      }
    ];
    mock.onGet(`/search?term=${ituneName}&media=music`).reply(200, data);
    const res = await getItunes(ituneName);
    expect(res.data).toEqual(data);
  });
});
