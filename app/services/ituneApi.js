import { generateApiClient } from '@utils/apiUtils';

const ituneApi = generateApiClient('itune');

export const getItunes = (ituneName) => ituneApi.get(`/search?term=${ituneName}&media=music`);
export const getItunesDetail = (ituneId) => ituneApi.get(`/lookup?id=${ituneId}&media=music`);
