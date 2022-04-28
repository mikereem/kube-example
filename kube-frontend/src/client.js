import fetch from 'unfetch';

export const getAllTodos = () => fetch('http://localhost:8081/api/v1/todos');

export const createTodo = (title, description) => fetch('http://localhost:8081/api/v1/todos', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
        title: title,
        description: description
    })
});