import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const ituneApi = generateApiClient('itune');

export const getRepos = (repoName) => repoApi.get(`/search/repositories?q=${repoName}`);
export const getItunes = (ituneName) => ituneApi.get(`/search?term=${ituneName}`);
