// LOGIN SYSTEM
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if (!savedUser && !savedPass) {
        localStorage.setItem("username", user);
        localStorage.setItem("password", pass);
        localStorage.setItem("loggedIn", "true");
        showApp();
    } else {
        if (user === savedUser && pass === savedPass) {
            localStorage.setItem("loggedIn", "true");
            showApp();
        } else {
            document.getElementById("loginError").textContent = "Wrong username or password";
        }
    }
}

function logout() {
    localStorage.setItem("loggedIn", "false");
    location.reload();
}

function showApp() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "block";

    let user = localStorage.getItem("username");
    document.getElementById("welcomeMsg").textContent = "Welcome, " + user + " 😊";

    loadTasks();
}

window.onload = function () {
    if (localStorage.getItem("loggedIn") === "true") {
        showApp();
    }
};

// HELP
function toggleHelp() {
    let box = document.getElementById("helpBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

// ADD TASK
function addTask() {
    let text = document.getElementById("taskInput").value;
    let date = document.getElementById("taskDate").value;
    let time = document.getElementById("taskTime").value;

    if (!text) return;

    let li = createTaskElement(text, date, time, false);
    document.getElementById("taskList").appendChild(li);

    saveTasks();

    document.getElementById("taskInput").value = "";
}

// CREATE TASK
function createTaskElement(text, date, time, completed) {
    let li = document.createElement("li");

    let span = document.createElement("span");

    span.textContent =
        (date ? date + " - " : "") +
        (time ? formatTime(time) + " - " : "") +
        text;

    if (completed) span.classList.add("completed");

    span.onclick = function () {
        span.classList.toggle("completed");
        saveTasks();
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
        let newText = prompt("Edit task:", text);
        if (newText) {
            span.textContent = newText;
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

    li.dataset.text = text;
    li.dataset.date = date;
    li.dataset.time = time;

    return li;
}

// SAVE
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.dataset.text,
            date: li.dataset.date,
            time: li.dataset.time,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LOAD
function loadTasks() {
    let saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(t => {
        let li = createTaskElement(t.text, t.date, t.time, t.completed);
        document.getElementById("taskList").appendChild(li);
    });
}

// SEARCH
function searchTask() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    document.querySelectorAll("#taskList li").forEach(li => {
        li.style.display = li.innerText.toLowerCase().includes(input) ? "flex" : "none";
    });
}

// FILTER
function filterTasks(type) {
    document.querySelectorAll("#taskList li").forEach(li => {
        let completed = li.querySelector("span").classList.contains("completed");

        if (type === "all") li.style.display = "flex";
        else if (type === "completed") li.style.display = completed ? "flex" : "none";
        else li.style.display = !completed ? "flex" : "none";
    });
}

// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// ENTER KEY
function handleEnter(e) {
    if (e.key === "Enter") addTask();
}

// TIME FORMAT
function formatTime(time) {
    let [h, m] = time.split(":");
    h = parseInt(h);
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + ":" + m + " " + ampm;
}
// SAVE MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// LOAD MODE
window.onload = function () {
    if (localStorage.getItem("loggedIn") === "true") {
        showApp();
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
};