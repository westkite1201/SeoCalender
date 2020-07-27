import produce from 'immer';

export const initialState = {
  selecteNoteIndex: [], // 화면에 보일 포스트들
  isEdit: false,
  editTodoItemIndex: 0,
  isLoading: false,
  imageUrl: '',
  imageUpload: {
    loading: false,
    data: '',
    error: null
  },
  createNoteModalView: false,
  titleMarkdownSource: '',
  markdownSource: '당신의 이야기를 적어주세요.',

  noteArray: []
};

export const SET_MARK_DOWN_SOURCE = 'note/SET_MARK_DOWN_SOURCE';
export const SET_TITLE_DOWN_SOURCE = 'note/SET_TITLE_DOWN_SOURCE';
export const IMAGE_UPLOAD_REQUEST = 'note/IMAGE_UPLOAD_REQUEST';
export const IMAGE_UPLOAD_SUCCESS = 'note/IMAGE_UPLOAD_SUCCESS';
export const IMAGE_UPLOAD_FAILURE = 'note/IMAGE_UPLOAD_FAILURE';

export const ADD_NOTE_REQUEST = 'note/ADD_NOTE_REQUEST';
export const ADD_NOTE_SUCCESS = 'note/ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAILURE = 'note/ADD_NOTE_FAILURE';

export const EDIT_NOTE_REQUEST = 'note/EDIT_NOTE_REQUEST';
export const EDIT_NOTE_SUCCESS = 'note/EDIT_NOTE_SUCCESS';
export const EDIT_NOTE_FAILURE = 'note/EDIT_NOTE_FAILURE';

export const GET_NOTE_REQUEST = 'note/GET_NOTE_REQUEST';
export const GET_NOTE_SUCCESS = 'note/GET_NOTE_SUCCESS';
export const GET_NOTE_FAILURE = 'note/GET_NOTE_FAILURE';

export const GET_NOTE_VIEW_REQUEST = 'note/GET_NOTE_REQUEST';
export const GET_NOTE_VIEW_SUCCESS = 'note/GET_NOTE_SUCCESS';
export const GET_NOTE_VIEW_FAILURE = 'note/GET_NOTE_FAILURE';

export const CREATE_NOTE_MODAL_OPEN = 'note/CREATE_NOTE_MODAL_OPEN';
export const CREATE_NOTE_MODAL_CLOSE = 'note/CREATE_NOTE_MODAL_CLOSE';
export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_TITLE_DOWN_SOURCE: {
        draft.titleMarkdownSource = action.payload.value;
        break;
      }
      case SET_MARK_DOWN_SOURCE: {
        draft.markdownSource = action.payload.value;
        break;
      }
      case GET_NOTE_REQUEST: {
        break;
      }
      case GET_NOTE_SUCCESS: {
        draft.noteArray = action.payload.data;
        draft.createNoteModalView = false;
        break;
      }
      case GET_NOTE_FAILURE: {
        break;
      }
      case IMAGE_UPLOAD_REQUEST: {
        break;
      }
      case IMAGE_UPLOAD_SUCCESS: {
        draft.imageUrl = action.payload.message;
        draft.imageUpload = action.payload;
        break;
      }
      case IMAGE_UPLOAD_FAILURE: {
        break;
      }

      case ADD_NOTE_SUCCESS: {
        draft.noteArray = action.payload.data;
        draft.createNoteModalView = false;
        break;
      }
      case CREATE_NOTE_MODAL_OPEN: {
        draft.createNoteModalView = true;
        break;
      }
      case CREATE_NOTE_MODAL_CLOSE: {
        draft.createNoteModalView = false;
        break;
      }
      default: {
        break;
      }
    }
  });
};
