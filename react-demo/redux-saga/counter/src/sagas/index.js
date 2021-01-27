/* eslint-disable no-constant-condition */

const { put, takeEvery, delay } = ReduxSaga.effects

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
