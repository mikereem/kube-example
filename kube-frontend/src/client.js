import fetch from 'unfetch';

export const getAllTodos = () => fetch('http://localhost:8081/api/v1/todos');