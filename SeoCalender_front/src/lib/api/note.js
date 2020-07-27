import axios from 'axios';

export async function uploadFiles(formData) {
  const response = await axios.post(
    'http://localhost:3031/api/file/uploadFiles',
    formData
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getNote() {
  const response = await axios.post('http://localhost:3031/api/note/addNote');
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
export async function addNote({ title }) {
  console.log('title ', title);
  let data = {
    title: title
  };
  const response = await axios.post(
    'http://localhost:3031/api/note/addNote',
    data
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function addNoteView() {
  const response = await axios.post(
    'http://localhost:3031/api/file/addNoteView'
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
