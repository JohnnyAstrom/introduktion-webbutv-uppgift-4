/**
 * functions.js
 * 
 * This file contains core functions for managing tasks in the ToDo list application. 
 * It includes functionalities for:
 * - Saving and loading tasks to/from localStorage
 * - Creating, rendering, and updating task items
 * - Managing task completion status and task removal
 * 
 * Functions in this file are designed to interact with the user interface, 
 * providing a seamless experience for adding and managing tasks.
 */

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

  // Create a span for the task text
  const textSpan = document.createElement('span');
  textSpan.textContent = task.text; // Display the task text
  textSpan.classList.add('task-text'); // Add the task-text class
  li.appendChild(textSpan); // Add the task text
  

  // Create a span for the date
  const dateSpan = document.createElement('span');
  dateSpan.textContent = task.date; // Display the task date
  dateSpan.classList.add('task-date');
  li.appendChild(dateSpan); // Add date next to the task text

  // Apply completed style if the task is completed
  if (task.completed) {
    li.classList.add('completed');
  }

  // Create and configure the remove button
  const removeButton = document.createElement('button');
  removeButton.innerHTML = '&#128465;';
  removeButton.classList.add('remove');
  li.appendChild(removeButton); // Add the remove button

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

  return li;
}

// Function to render task list
function renderTaskList() {
  renderList(taskList, false); // false for not completed tasks
}

// Function to render completed task list
function renderTaskCompletedList() {
  renderList(taskCompletedList, true); // true for completed tasks
}

// Function to render a list based on completion status
function renderList(listElement, completedStatus) {
  listElement.innerHTML = '';

  // Sort tasks by date
  const sortedTasks = tasks
    .filter(function(task) {
      return task.completed === completedStatus;
    })
    .sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

  sortedTasks.forEach(function (task, index) {
    const listItem = createListItem(task, index);
    listElement.appendChild(listItem);
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