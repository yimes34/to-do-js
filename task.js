const addTask = document.querySelector(".addTask"),
    addTaskForm = addTask.querySelector("form"),
    taskInput = addTask.querySelector("input");

const taskToDo = document.querySelector(".taskToDo"),
    taskList = taskToDo.querySelector(".taskList");


const TASK_LS = "tasks";

let taskToDoList = [];

function saveTask() {
    localStorage.setItem(TASK_LS, JSON.stringify(taskToDoList));
}

function completeTask(event) {
    const btn = event.target;
    const spanR = btn.parentNode;
    const li = spanR.parentNode;

    const loadedTask = localStorage.getItem(TASK_LS);
    const parsedTask = JSON.parse(loadedTask);
    const todoDoneId = parseInt(li.id);
    parsedTask.forEach(function(item) {
        if(item.id === todoDoneId) {
            item.status = "done";
        }
    })

    const ul = li.parentNode;
    const div = ul.parentNode;
    div.removeChild(ul);
    const newUl = document.createElement("ul")
    newUl.classList.add("taskList");
    div.appendChild(newUl);
    localStorage.setItem(TASK_LS, JSON.stringify(parsedTask));
    loadtaskToDoList();
}

function undoTask(event) {
    const btn = event.target;
    const spanR = btn.parentNode;
    const li = spanR.parentNode;
    const spanL = li.querySelector(".spanL");
    spanL.classList.remove("done");

    const loadedTask = localStorage.getItem(TASK_LS);
    const parsedTask = JSON.parse(loadedTask);
    const todoDoneId = parseInt(li.id);
    parsedTask.forEach(function(item) {
        if(item.id === todoDoneId) {
            item.status = "onGoing";
        }
    })

    const ul = li.parentNode;
    const div = ul.parentNode;
    div.removeChild(ul);
    const newUl = document.createElement("ul")
    newUl.classList.add("taskList");
    div.appendChild(newUl);
    localStorage.setItem(TASK_LS, JSON.stringify(parsedTask));
    loadtaskToDoList();
}

function deleteTask(event) {
    const btn = event.target;
    const spanR = btn.parentNode;
    const li = spanR.parentNode;
    taskList.removeChild(li);
    
    const todoDelId = parseInt(li.id);

    const loadedTask = localStorage.getItem(TASK_LS);
    const parsedTask = JSON.parse(loadedTask);

    const cleanList = parsedTask.filter(function(item) {
        return item.id !== todoDelId;
    });

    localStorage.setItem(TASK_LS, JSON.stringify(cleanList));
}

function paintToDoList(todo) {
    const taskToDo = document.querySelector(".taskToDo"),
    taskList = taskToDo.querySelector(".taskList");
    const li = document.createElement("li"),
        comBtn = document.createElement("i"),
        undoBtn = document.createElement("i"),
        delBtn = document.createElement("i"),
        spanR = document.createElement("span");
        spanL = document.createElement("span");
    comBtn.classList.add("fas");
    comBtn.classList.add("fa-check-square");
    undoBtn.classList.add("fas");
    undoBtn.classList.add("fa-undo-alt");
    delBtn.classList.add("fas");
    delBtn.classList.add("fa-trash");
    spanL.classList.add("spanL");
    spanR.classList.add("spanR");
    spanL.innerText = todo.item;
    if(todo.status === "done") {
        spanL.classList.add("done");
    }
    li.appendChild(spanL);

    if(todo.status === "done") {
        spanR.appendChild(undoBtn);
    } else {
        spanR.appendChild(comBtn);
    }
    spanR.appendChild(delBtn);
    comBtn.addEventListener("click", completeTask);
    undoBtn.addEventListener("click", undoTask);
    delBtn.addEventListener("click", deleteTask);
    li.appendChild(spanR);
    
    li.id = todo.id;
    taskList.appendChild(li);
}

function addToDoList(todo) {
    const taskToDo = document.querySelector(".taskToDo"),
    taskList = taskToDo.querySelector(".taskList");
    const li = document.createElement("li"),
        comBtn = document.createElement("i"),
        delBtn = document.createElement("i"),
        spanR = document.createElement("span");
        spanL = document.createElement("span");
    comBtn.classList.add("fas");
    comBtn.classList.add("fa-check-square");
    delBtn.classList.add("fas");
    delBtn.classList.add("fa-trash");
    spanL.classList.add("spanL");
    spanR.classList.add("spanR");
    spanL.innerText = todo;
    li.appendChild(spanL);

    spanR.appendChild(comBtn);
    spanR.appendChild(delBtn);
    li.appendChild(spanR);
    
    const date = new Date();
    const timeStamp = date.getTime();
    li.id = timeStamp;
    taskList.appendChild(li);    
    const taskObj = {
        item: todo,
        id: timeStamp,
        status: "onGoing",
    }
    taskToDoList.push(taskObj);
    saveTask();
}

function submitHandler(event) {
    event.preventDefault();
    const newTask = taskInput.value;
    addToDoList(newTask);
}

function loadtaskToDoList() {
    const loadedTaskToDoList = localStorage.getItem(TASK_LS);
    if(loadedTaskToDoList !== null) {
        const parsedTaskToDoList = JSON.parse(loadedTaskToDoList);
        parsedTaskToDoList.forEach(function(todo){
            paintToDoList(todo);
        })
    }
}

function initToDoList() {
    loadtaskToDoList();
    addTaskForm.addEventListener("submit", submitHandler)
}

initToDoList(); 