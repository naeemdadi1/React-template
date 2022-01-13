import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunesContainer state domain
 */

const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

const makeSelectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export default makeSelectItunesContainer;
export { selectItunesContainerDomain };
