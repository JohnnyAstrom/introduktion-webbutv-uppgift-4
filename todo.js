//Javascript code for the todo list application

// Select HTML elements
const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const taskList = document.querySelector('#taskList');
const completedCount = document.querySelector('#completedCount');
const notCompletedCount = document.querySelector('#notCompletedCount');
const taskCompletedList = document.querySelector('#taskCompletedList');
const noTaskInput = document.querySelector('#noTaskInput');

// Array to store tasks
let tasks = [];

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// Function to create and return a new list item
function createListItem(task, index) {
  const li = document.createElement('li');
  li.textContent = task.text;
  
  // Apply completed style if the task is completed
  if (task.completed) {
    li.classList.add('completed');
  }

  // Create and configure the remove button
  const removeButton = document.createElement('button');
  removeButton.innerHTML = '&#128465;';
  removeButton.classList.add('remove');

  // Event listener to handle task removal
  removeButton.addEventListener('click', function () {
    tasks.splice(index, 1);
    saveTasks();
    updateUI();
  });

  // Event listener to toggle task completion status
  li.addEventListener('click', function () {
    task.completed = !task.completed;
    saveTasks();
    updateUI();
  });

  // Add the remove button to the list item
  li.appendChild(removeButton);
  return li;
}

// Function to render task list
function renderTaskList() {
  taskList.innerHTML = '';

  tasks.forEach(function (task, index) {
    if (!task.completed) {
      const listItem = createListItem(task, index);
      taskList.appendChild(listItem);
    }
  });
}

// Function to render completed task list
function renderTaskCompletedList() {
  taskCompletedList.innerHTML = '';

  tasks.forEach(function (task, index) {
    if (task.completed) {
      const listItem = createListItem(task, index);
      taskCompletedList.appendChild(listItem);
    }
  });
}

// Function to update count of completed tasks
function updateCompletedCount() {
  let completedTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed) {
      completedTasks++;
    }
  }
  completedCount.textContent = completedTasks;
}

// Function to update count of not completed tasks
function updateNotCompletedCount() {
  let notCompletedTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].completed) {
      notCompletedTasks++;
    }
  }
  notCompletedCount.textContent = notCompletedTasks;
}

// Function to update the user interface
function updateUI() {
  renderTaskList();
  renderTaskCompletedList();
  updateCompletedCount();
  updateNotCompletedCount();
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value;

  if (!taskText) {
    noTaskInput.textContent = 'OBS: Du måste skriva något!';
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';
  noTaskInput.textContent = '';
  saveTasks();
  updateUI();
}

// Function to allow Enter key to input new task
function keydownEnter(event){
  if(event.key === 'Enter'){
    addTask();
  }
};

// Add a new task to the list when the "Add Task" button is clicked
addTaskButton.addEventListener('click', addTask);

// Add a new task to the list when Enter key is pressed
taskInput.addEventListener('keydown', keydownEnter); 

// Initial setup
loadTasks();
updateUI();