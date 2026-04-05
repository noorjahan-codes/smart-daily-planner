function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dateInput = document.getElementById("taskDate");
    let timeInput = document.getElementById("taskTime");

    let taskText = taskInput.value.trim();
    let date = dateInput.value;
    let time = timeInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let formattedTime = "";
    if (time) {
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);

        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;

        formattedTime = hours + ":" + minutes + " " + ampm;
    }

    let fullTask = "";

    if (date && formattedTime) {
        fullTask = date + " - " + formattedTime + " - " + taskText;
    } else if (date) {
        fullTask = date + " - " + taskText;
    } else if (formattedTime) {
        fullTask = formattedTime + " - " + taskText;
    } else {
        fullTask = taskText;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = fullTask;

    span.onclick = function () {
        span.classList.toggle("completed");
        saveTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        let newTask = prompt("Edit task:", span.textContent);
        if (newTask) {
            span.textContent = newTask;
            saveTasks();
        }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

window.onload = function () {
    document.getElementById("taskList").innerHTML = localStorage.getItem("tasks") || "";
};

function searchTask() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.getElementById("taskList").getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        let text = tasks[i].innerText.toLowerCase();
        tasks[i].style.display = text.includes(input) ? "" : "none";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
function handleEnter(event) {
   if (event.key === "Enter"){
     addTask();
}
}
function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let span = task.querySelector("span");
        let isCompleted = span.classList.contains("completed");

        if (type === "all") {
            task.style.display = "flex";
        } else if (type === "completed") {
            task.style.display = isCompleted ? "flex" : "none";
        } else if (type === "pending") {
            task.style.display = !isCompleted ? "flex" : "none";
        }
    });
}
function checkUser() {
    let username = localStorage.getItem("username");

    if (!username) {
        username = prompt("Enter your name:");
        if (username) {
            localStorage.setItem("username", username);
        }
    }

    if (username) {
        document.getElementById("welcomeMsg").textContent = "Welcome, " + username + " 😊";
    }
}

window.onload = function () {
    checkUser();

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(taskHTML => {
        let li = document.createElement("li");
        li.innerHTML = taskHTML;

        let span = li.querySelector("span");
        span.onclick = function () {
            span.classList.toggle("completed");
            saveTasks();
        };

        let editBtn = li.querySelector("button:nth-child(2)");
        editBtn.onclick = function () {
            let newTask = prompt("Edit task:", span.textContent);
            if (newTask) {
                span.textContent = newTask;
                saveTasks();
            }
        };

        let deleteBtn = li.querySelector("button:nth-child(3)");
        deleteBtn.onclick = function () {
            li.remove();
            saveTasks();
        };

        document.getElementById("taskList").appendChild(li);
    });
};