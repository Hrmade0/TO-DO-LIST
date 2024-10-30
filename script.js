document.getElementById("addTaskButton").addEventListener("click", addTask);

let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput").value.trim();
  const priority = document.getElementById("prioritySelect").value;
  const dueDate = document.getElementById("dueDatePicker").value;
  
  if (!taskInput) {
    alert("Please enter a task description.");
    return;
  }

  const task = {
    id: Date.now(),
    description: taskInput,
    priority,
    dueDate,
    completed: false,
  };

  tasks.push(task);
  displayTasks();
  updateProgress();
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    
    const priorityBadge = document.createElement("span");
    priorityBadge.className = `task-priority ${task.priority}`;
    priorityBadge.textContent = task.priority;
    
    const taskDescription = document.createElement("span");
    taskDescription.textContent = task.description;

    const dueDateBadge = document.createElement("span");
    dueDateBadge.className = "due-date";
    dueDateBadge.textContent = task.dueDate ? `Due: ${task.dueDate}` : "";

    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.checked = task.completed;
    completeCheckbox.addEventListener("click", () => toggleComplete(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));
    
    taskItem.append(completeCheckbox, priorityBadge, taskDescription, dueDateBadge, deleteButton);
    taskList.appendChild(taskItem);
  });
}

function toggleComplete(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  displayTasks();
  updateProgress();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
  updateProgress();
}

function filterTasks(status) {
  const now = new Date().toISOString().slice(0, 10);
  let filteredTasks;

  switch (status) {
    case "all":
      filteredTasks = tasks;
      break;
    case "active":
      filteredTasks = tasks.filter(task => !task.completed);
      break;
    case "completed":
      filteredTasks = tasks.filter(task => task.completed);
      break;
    case "overdue":
      filteredTasks = tasks.filter(task => task.dueDate && task.dueDate < now && !task.completed);
      break;
    default:
      filteredTasks = tasks;
  }

  tasks = filteredTasks;
  displayTasks();
}

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  
  document.getElementById("progressFill").style.width = `${progress}%`;
}
