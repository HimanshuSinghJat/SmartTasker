import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "tasks.json");

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Helper: Read tasks
function getTasks() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]");
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading tasks:", err);
    return [];
  }
}

// ✅ Helper: Save tasks
function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// 📜 Route: Get all tasks
app.get("/tasks", (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

// ➕ Route: Add a new task
app.post("/tasks", (req, res) => {
  const tasks = getTasks();
  const newTask = {
    name: req.body.name,
    time: req.body.time,
    category: req.body.category || "Today"
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// ❌ Route: Delete all tasks
app.delete("/tasks", (req, res) => {
  saveTasks([]);
  res.json({ message: "All tasks deleted" });
});

// 🚀 Serve frontend (optional, if you run both together)
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
