import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunesContainer state domain
 */

export const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

const makeSelectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export const selectItunesData = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'itunesData'));

export const selectItunesError = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'itunesError'));

export const selectItuneName = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'ituneName'));

export default makeSelectItunesContainer;
