import { generateApiClient } from '@app/utils/apiUtils';

const ituneApi = generateApiClient('ituneDetail');

export const getItunesDetail = (ituneId) => ituneApi.get(`/lookup?id=${ituneId}`);
