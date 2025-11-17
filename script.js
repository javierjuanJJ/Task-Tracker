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
  