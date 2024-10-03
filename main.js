/**
 * main.js
 * 
 * This file serves as the entry point for the ToDo list application. 
 * It handles the initialization of the application, including:
 * - Setting up event listeners for user interactions (e.g., adding tasks, changing styles)
 * - Loading existing tasks from localStorage and updating the user interface
 * - Allowing task addition via button clicks or the Enter key
 * 
 * Functions in this file connect user actions to the core functionalities defined in functions.js,
 * ensuring a smooth and interactive user experience.
 */

// Select HTML elements
const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const taskList = document.querySelector('#taskList');
const completedCount = document.querySelector('#completedCount');
const notCompletedCount = document.querySelector('#notCompletedCount');
const taskCompletedList = document.querySelector('#taskCompletedList');
const noTaskInput = document.querySelector('#noTaskInput');
const stylesheetLink = document.getElementById('stylesheet');

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = document.querySelector('#taskDate').value; // Get the date input

  if (!taskText) {
    noTaskInput.textContent = "This field can't be empty";
    return;
  }

  tasks.push({ text: taskText, date: taskDate, completed: false });
  taskInput.value = '';
  document.querySelector('#taskDate').value = '';
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

// Function to initialize the application
function initialize() {
  loadTasks();
  updateUI();

  addTaskButton.addEventListener('click', function() {
    addTask();});

  taskInput.addEventListener('keydown', function() {
    keydownEnter(event);}); 
  
  // Buttons to apply styles
  document.getElementById('style1Button').addEventListener('click', function() {
    stylesheetLink.setAttribute('href', 'styles1.css');});
  
  document.getElementById('style2Button').addEventListener('click', function() {
    stylesheetLink.setAttribute('href', 'styles2.css');});
}

initialize();