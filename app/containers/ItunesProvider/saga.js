import { getItunes, getItunesDetail } from '@services/ituneApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesContainerCreators, itunesContainerTypes } from './reducer';
// Individual exports for testing
const { REQUEST_GET_ITUNES_DATA, REQUEST_GET_ITUNE } = itunesContainerTypes;
const { successGetItunesData, failureGetItunesData, successGetItuneDetail, failureGetItuneDetail } =
  itunesContainerCreators;

export function* getItunesData(action) {
  const res = yield call(getItunes, action.ituneName);
  const { data, ok } = res;
  if (ok) {
    yield put(successGetItunesData(data));
  } else {
    yield put(failureGetItunesData(data));
  }
}

//For ItuneDetail
export function* getItune(action) {
  const res = yield call(getItunesDetail, action.id);
  const { data, ok } = res;
  if (ok) {
    const updatedData = data.results[0];
    yield put(successGetItuneDetail(updatedData));
  } else {
    yield put(failureGetItuneDetail(data));
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_DATA, getItunesData);
  yield takeLatest(REQUEST_GET_ITUNE, getItune);
}
