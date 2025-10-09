let tasks = [
  { name: "Meeting with client", time: "11:00", category: "today" },
  { name: "Laptop Service", time: "13:00", category: "today" },
  { name: "Daily UI Exercise", time: "15:00", category: "daily" },
  { name: "Work Submission", time: "19:00", category: "weekly" },
  { name: "Client Submission", time: "22:00", category: "monthly" },
];

const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const taskTime = document.getElementById("task-time");
const addBtn = document.getElementById("add-task");
const deleteAllBtn = document.getElementById("delete-all");
const tabs = document.querySelectorAll(".tab");

let activeTab = "today";

function renderTasks() {
  taskList.innerHTML = "";
  const filtered = tasks.filter(t => t.category === activeTab);

  if (filtered.length === 0) {
    taskList.innerHTML = "<li><span>No tasks available</span></li>";
    return;
  }

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.name} - ${formatTime(task.time)}</span>
      <button onclick="deleteTask(${index})">✕</button>
    `;
    taskList.appendChild(li);
  });
}

function formatTime(time) {
  let [hour, minute] = time.split(":");
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${suffix}`;
}

addBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  const time = taskTime.value;

  if (name === "" || time === "") {
    alert("Please enter both task and time!");
    return;
  }

  tasks.push({ name, time, category: activeTab });
  taskInput.value = "";
  taskTime.value = "";
  renderTasks();
});

function deleteTask(index) {
  const filtered = tasks.filter(t => t.category === activeTab);
  const taskToDelete = filtered[index];
  tasks = tasks.filter(t => t !== taskToDelete);
  renderTasks();
}

deleteAllBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => t.category !== activeTab);
  renderTasks();
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeTab = tab.dataset.tab;
    renderTasks();
  });
});
