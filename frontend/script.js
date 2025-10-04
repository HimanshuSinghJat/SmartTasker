const tasksContainer = document.querySelector('.tasks');
const addBtn = document.querySelector('.btn.add');
const deleteBtn = document.querySelector('.btn.delete');
const tabs = document.querySelectorAll('.tab');

let currentTab = "Today"; // default active tab

// Load tasks from backend and show only current tab
async function loadTasks() {
  try {
    const res = await fetch('http://localhost:3000/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error("Failed to load tasks:", err);
  }
}

// Render tasks dynamically
function renderTasks(tasks) {
  tasksContainer.innerHTML = '';

  // Filter tasks by category (if you want category tabs)
  const filtered = tasks.filter(t => t.category === currentTab || !t.category);

  if (filtered.length === 0) {
    tasksContainer.innerHTML = `<p style="text-align:center;color:#888;">No tasks in ${currentTab}</p>`;
    return;
  }

  filtered.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `<span>${task.name}</span><span class="time">${task.time}</span>`;
    tasksContainer.appendChild(div);
  });
}

// Add a new task
addBtn.addEventListener('click', async () => {
  const name = prompt('Enter task name:');
  const time = prompt('Enter time (e.g., 2:00 pm):');
  if (!name || !time) return;

  // Add category based on current tab
  const category = currentTab;

  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, time, category })
  });

  // Refresh task list
  loadTasks();
});

// Delete all tasks
deleteBtn.addEventListener('click', async () => {
  if (confirm('Delete all tasks?')) {
    await fetch('http://localhost:3000/tasks', { method: 'DELETE' });
    loadTasks();
  }
});

// Handle tab switching
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.textContent;
    loadTasks();
  });
});

// Initial load
loadTasks();
