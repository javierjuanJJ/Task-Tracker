let tasks = [];

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    description: input.value.trim(),
    completed: false,
  };
  if (newTask.description !== '') {
    tasks.push(newTask);
    input.value = '';
    renderTasks();
  }
});


function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  // Separar tareas pendientes y completadas
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  // Mostrar primero pendientes
  pendingTasks.forEach((task, index) => {
    const li = createTaskElement(task, index);
    list.appendChild(li);
  });

  // Luego completadas
  completedTasks.forEach((task, index) => {
    const li = createTaskElement(task, index + pendingTasks.length);
    list.appendChild(li);
  });
}


function createTaskElement(task, index) {
  const li = document.createElement('li');
  li.textContent = task.description;
  if (task.completed) {
    li.style.textDecoration = 'line-through';
  }

  // Botón para marcar/desmarcar
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
  toggleBtn.addEventListener('click', () => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  });

  // Botón para eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', () => {
    tasks.splice(index, 1);
    renderTasks();
  });

  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);

  return li;
}

