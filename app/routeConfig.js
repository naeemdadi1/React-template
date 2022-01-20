import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import ItuneDetailContainer from './containers/ItunesProvider/ItuneDetailContainer/Loadable';
import ItunesContainer from './containers/ItunesProvider/ItunesContainer/Loadable';
export const routeConfig = {
  itunes: {
    component: ItunesContainer,
    ...routeConstants.repos
  },
  ituneDetail: {
    component: ItuneDetailContainer,
    ...routeConstants.ituneDetail
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
