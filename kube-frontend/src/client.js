import fetch from 'unfetch';

export const getAllTodos = () => fetch(`${window.CONFIG.API_BASE_URL}/api/v1/todos`);

export const createTodo = (title, description) => fetch(`${window.CONFIG.API_BASE_URL}/api/v1/todos`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
        title: title,
        description: description
    })
});