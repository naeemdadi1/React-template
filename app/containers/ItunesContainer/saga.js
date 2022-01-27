import { getItunes } from '@services/ituneApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesContainerCreators, itunesContainerTypes } from './reducer';
// Individual exports for testing
const { REQUEST_GET_ITUNES_DATA } = itunesContainerTypes;
const { successGetItunesData, failureGetItunesData } = itunesContainerCreators;
export function* getItunesData(action) {
  const res = yield call(getItunes, action.ituneName);
  const { data, ok } = res;
  if (ok) {
    yield put(successGetItunesData(data));
  } else {
    yield put(failureGetItunesData(data));
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_DATA, getItunesData);
}
