const API_URL = 'http://localhost:3000/todos';

async function fetchTodos() {

    try {
        const res = await fetch(API_URL);
        const todos = await res.json();
        const list = document.getElementById('todoList');
        list.innerHTML = '';
        todos.forEach(todo => {
            let el = document.createElement('div');
            el.className = 'todo';
            el.innerHTML = `
                <p>${todo.title}</p>  ${todo.status}<br>
                Created at: ${new Date(todo.createdAt).toLocaleString()}<br>
                Updated: ${new Date(todo.updatedAt).toLocaleString()}<br>
                Completed: ${todo.completed}<br>
                <h2> Description: ${todo.description} </h2> <br>
                <input type="text" id="edit-${todo._id}" placeholder="enter new title" />
                <button onclick="editTodo('${todo._id}')">Update Title</button>
                <button onclick="deleteTodo('${todo._id}')">Delete</button>
                <button onclick="markCompleted('${todo._id}', ${todo.completed})">mark as completed</button>
            `;
            list.appendChild(el);
    });
    } 
    catch (err) {
    console.error('Fetch eror:', err);
    }
}

document.getElementById('todoForm').addEventListener('submit', async (e) => {
  const title = document.getElementById('title').value;
  const status = document.getElementById('status').value;
  const description = document.getElementById('description').value;

  if (!title) return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status, description })
    });
    e.target.reset();
    fetchTodos();
  } catch (err) {
    console.error('POST failed:', err);
  }
});


async function deleteTodo(id) {
try {
    const response = await fetch(`${API_URL}/${id}`, { 
        method: 'DELETE' 
    });

    fetchTodos();
} catch (err) {
    console.error('Delete failed:', err);
}
}


async function markCompleted(id, current) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !current })
  });
  fetchTodos();
}

async function editTodo(id) {
  const newTitle = document.getElementById(`edit-${id}`).value;
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle })
  });
  fetchTodos();
}


fetchTodos();