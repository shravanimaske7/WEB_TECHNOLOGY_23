import { useState } from "react";
import type { Task } from "./types";

interface TaskInputProps {
  onAdd: (title: string) => void;
}

function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState<string>("");

  function add(): void {
    if (title.trim() === "") return;
    onAdd(title);
    setTitle("");
  }

  return (
    <div className="task-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && add()}
        placeholder="Enter a task"
      />
      <button className="add-btn" onClick={add}>Add Task</button>
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className={task.completed ? "task completed" : "task"}>
      <span>{task.title}</span>
      <div className="task-actions">
        <button className="complete-btn" onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id: number): void {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function deleteTask(id: number): void {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="app-card">
      <p className="eyebrow">YOUR DAILY PLANNER</p>
      <h1>Typed To-Do List</h1>
      <p className="subtitle">Small steps make a big difference.</p>
      <TaskInput onAdd={addTask} />
      <p className="task-count">{tasks.filter((task) => task.completed).length} of {tasks.length} tasks completed</p>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
      {tasks.length === 0 && <p className="empty-message">Your task list is empty. Add your first task above!</p>}
    </main>
  );
}
