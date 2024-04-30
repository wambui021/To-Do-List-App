const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const allTasksButton = document.getElementById('all-tasks');
const completedTasksButton = document.getElementById('completed-tasks');
const pendingTasksButton = document.getElementById('pending-tasks');
const prioritySelect = document.getElementById('priority');
const dueDateInput = document.getElementById('due-date');

let tasks = []; // Array to store tasks

function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTaskList();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(taskText, isCompleted, priority, dueDate) {
  return {
    text: taskText,
    completed: isCompleted,
    priority: priority,
    dueDate: dueDate,
  };
}

function renderTaskList() {
  taskList.innerHTML = ''; // Clear existing list items
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.text;
    listItem.classList.add('task');
    listItem.classList.add(task.priority); // Add class for priority

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      task.completed = this.checked;
      saveTasks();
      renderTaskList(); // Update list on completion change
    });
    listItem.appendChild(checkbox);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-task');
    editButton.addEventListener('click', function() {
      const newTaskText = prompt("Enter new task:");
      if (newTaskText) {
        task.text = newTaskText;
        saveTasks();
        renderTaskList();
      }
    });
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-task');
    deleteButton.addEventListener('click', function() {
      const taskIndex = tasks.indexOf(task);
      tasks.splice(taskIndex, 1);
      saveTasks();
      renderTaskList();
    });
    listItem.appendChild(deleteButton);

    // Add due date
