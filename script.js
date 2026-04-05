function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;

    if (!taskInput) return; // allow empty date/time

    const li = document.createElement("li");

    li.dataset.date = taskDate;
    li.dataset.time = taskTime;

    li.innerHTML = `
        <span>${taskInput}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);

    li.querySelector("span").onclick = function () {
        this.classList.toggle("completed");
        saveTasks();
    };

    saveTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
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
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const span = li.querySelector("span");
        const completed = span.classList.contains("completed");
        const text = span.textContent;
        const date = li.dataset.date || "";
        const time = li.dataset.time || "";
        tasks.push({ text, date, time, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
window.onload = function () {
    checkUser(); // login system

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.dataset.date = task.date;
        li.dataset.time = task.time;

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        li.querySelector("span").onclick = function () {
            this.classList.toggle("completed");
            saveTasks();
        };

        document.getElementById("taskList").appendChild(li);
    });
};
function editTask(btn) {
    const li = btn.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Edit task:", span.textContent);
    if (newText) {
        span.textContent = newText;
        saveTasks();
    }
}

function deleteTask(btn) {
    const li = btn.parentElement;
    li.remove();
    saveTasks();
}