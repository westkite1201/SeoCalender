import axios from 'axios';

export async function getUserTodos(todoNum) {
  console.log(todoNum);
  const data = {
    todoNum: todoNum,
  };

  const response = await axios.post(
    `http://localhost:3031/api/todo/getTodo`,
    data,
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
export async function addUserTodo(data) {
  const response = await axios.post(
    `http://localhost:3031/api/todo/addTodo`,
    data,
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function editUserTodo(data) {
  const response = await axios.post(
    `http://localhost:3031/api/todo/editTodo`,
    data,
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function deleteUserTodo(data) {
  const response = await axios.post(
    `http://localhost:3031/api/todo/deleteTodo`,
    data,
  );
  return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}
