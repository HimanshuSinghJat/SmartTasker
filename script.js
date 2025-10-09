// Select DOM elements
const tasksContainer = document.querySelector('.tasks');
const addBtn = document.querySelector('.btn.add');
const deleteBtn = document.querySelector('.btn.delete');

// Function to create a new task element
function createTask(name, time) {
  const task = document.createElement('div');
  task.classList.add('task');

  // Task name
  const taskName = document.createElement('span');
  taskName.textContent = name;

  // Task time
  const taskTime = document.createElement('span');
  taskTime.classList.add('time');
  taskTime.textContent = time;

  // Append children
  task.appendChild(taskName);
  task.appendChild(taskTime);

  // Add click event to select/unselect task
  task.addEventListener('click', () => {
    task.classList.toggle('active');
  });

  return task;
}

// Add new task
addBtn.addEventListener('click', () => {
  const name = prompt('Enter task name:');
  if (!name) return;

  const time = prompt('Enter task time (e.g., 3:00 pm):');
  if (!time) return;

  const newTask = createTask(name, time);
  tasksContainer.appendChild(newTask);
});

// Delete selected tasks
deleteBtn.addEventListener('click', () => {
  const activeTasks = document.querySelectorAll('.task.active');
  if (activeTasks.length === 0) {
    alert('Please select a task to delete.');
    return;
  }
  activeTasks.forEach(task => task.remove());
});
