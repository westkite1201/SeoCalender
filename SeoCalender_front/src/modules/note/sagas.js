import { uploadFiles, getNote, addNote, addNoteView } from '../../lib/api/note';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  GET_NOTE_VIEW_REQUEST,
  GET_NOTE_VIEW_SUCCESS,
  GET_NOTE_VIEW_FAILURE
} from './reducer';

function* uploadFilesSaga(action) {
  try {
    console.log('uploadFilesSaga', action.payload);
    const imageUploadRes = yield call(uploadFiles, action.payload);
    console.log('imageUploadRes', imageUploadRes);
    yield put({
      type: IMAGE_UPLOAD_SUCCESS,
      payload: {
        loading: false,
        data: imageUploadRes.message,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: IMAGE_UPLOAD_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}

function* getNoteSaga(action) {
  try {
    console.log('getNote', action.payload);
    const getNoteRes = yield call(getNote, action.payload);
    console.log('imageUploadRes', getNoteRes);
    yield put({
      type: GET_NOTE_SUCCESS,
      payload: {
        loading: false,
        data: getNoteRes.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: GET_NOTE_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}
function* addNoteSaga(action) {
  try {
    console.log('addNoteSaga', action.payload);
    const addNoteRes = yield call(addNote, action.payload);
    console.log('addNoteRes', addNoteRes);
    yield put({
      type: ADD_NOTE_SUCCESS,
      payload: {
        loading: false,
        data: addNoteRes.data,
        error: null
      }
    });
  } catch (e) {
    yield put({
      type: ADD_NOTE_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e
      }
    });
  }
}
export function* noteSaga() {
  yield takeEvery(IMAGE_UPLOAD_REQUEST, uploadFilesSaga);
  yield takeEvery(ADD_NOTE_REQUEST, addNoteSaga);
  yield takeEvery(GET_NOTE_REQUEST, getNoteSaga);
}
