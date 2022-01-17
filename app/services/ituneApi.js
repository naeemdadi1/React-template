import { generateApiClient } from '@app/utils/apiUtils';

const ituneApi = generateApiClient('itune');

export const getItunes = (ituneName) => ituneApi.get(`/search?term=${ituneName}`);
