import { Task } from "./types";

// Typed array that only accepts Task objects[cite: 3]
let tasks: Task[] = []; //[cite: 3]

// Function to add a task with typed parameter and return type[cite: 3]
export function addTask(title: string): void { //[cite: 3]
  const newTask: Task = { //[cite: 3]
    id: Date.now(), //[cite: 3]
    title: title, //[cite: 3]
    completed: false //[cite: 3]
  };
  tasks.push(newTask); //[cite: 3]
  console.log(`Added: "${title}"`);
}

// Function to toggle task completion state[cite: 3]
export function toggleTask(id: number): void { //[cite: 3]
  tasks = tasks.map((task: Task) => { //[cite: 3]
    if (task.id === id) { //[cite: 3]
      return {
        ...task, //[cite: 3]
        completed: !task.completed //[cite: 3]
      };
    }
    return task; //[cite: 3]
  });
  console.log(`Toggled status for task ID: ${id}`);
}

// Function to delete a task by ID[cite: 3]
export function deleteTask(id: number): void { //[cite: 3]
  tasks = tasks.filter((task: Task) => task.id !== id); //[cite: 3]
  console.log(`Deleted task ID: ${id}`);
}

// Helper to view current tasks
export function getTasks(): Task[] {
  return tasks;
}

// Demonstration run
console.log("--- Initial Execution ---");
addTask("Study TypeScript Interfaces");
addTask("Practice React Components");
console.log("Current Tasks:", getTasks());

toggleTask(tasks[0].id);
console.log("After Toggling Task 1:", getTasks());

deleteTask(tasks[1].id);
console.log("After Deleting Task 2:", getTasks());