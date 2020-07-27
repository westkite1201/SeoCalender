import {
  getUserTodos,
  addUserTodo,
  editUserTodo,
  deleteUserTodo,
} from '../../lib/api/todo';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILURE,
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_FAILURE,
  DELETE_TODO_SUCCESS,
} from './reducer';

function* getUserTodoSaga(action) {
  try {
    console.log('getUserTodoSaga', action.payload);
    const userTodos = yield call(getUserTodos, action.payload);
    console.log('usetToods ', userTodos);
    yield put({
      type: GET_TODOS_SUCCESS,
      payload: {
        loading: false,
        data: userTodos.data,
        error: null,
      },
    });
  } catch (e) {
    yield put({
      type: GET_TODOS_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e,
      },
    });
  }
}

function* addUserTodoSaga(action) {
  try {
    console.log('getUserTodoSaga', action.payload);
    const userTodos = yield call(addUserTodo, action.payload);
    yield put({
      type: ADD_TODO_SUCCESS,
      payload: {
        loading: false,
        data: userTodos.data,
        error: null,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_TODO_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e,
      },
    });
  }
}

function* editUserTodoSaga(action) {
  try {
    console.log('getUserTodoSaga', action.payload);
    const userTodos = yield call(editUserTodo, action.payload);
    yield put({
      type: EDIT_TODO_SUCCESS,
      payload: {
        loading: false,
        data: userTodos.data,
        error: null,
      },
    });
  } catch (e) {
    yield put({
      type: EDIT_TODO_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e,
      },
    });
  }
}

function* deleteUserTodoSaga(action) {
  try {
    console.log('getUserTodoSaga', action.payload);
    const userTodos = yield call(deleteUserTodo, action.payload);
    yield put({
      type: DELETE_TODO_SUCCESS,
      payload: {
        loading: false,
        data: userTodos.data,
        error: null,
      },
    });
  } catch (e) {
    yield put({
      type: DELETE_TODO_FAILURE,
      payload: {
        loading: false,
        data: [],
        error: e,
      },
    });
  }
}
export function* todoSaga() {
  yield takeEvery(ADD_TODO_REQUEST, addUserTodoSaga);
  yield takeEvery(GET_TODOS_REQUEST, getUserTodoSaga);
  yield takeEvery(EDIT_TODO_REQUEST, editUserTodoSaga);
  yield takeEvery(DELETE_TODO_REQUEST, deleteUserTodoSaga);
}
