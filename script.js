let tasks = [];

// Load saved tasks
window.onload = function () {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => createTaskElement(task));
    }
};

function addTask() {
    let input = document.getElementById("taskInput");
    let date = document.getElementById("taskDate").value;
    let time = document.getElementById("taskTime").value;

    let taskText = input.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let fullTask = "";

if (date && time) {
    fullTask = date + " - " + time + " - " + taskText;
} else if (date) {
    fullTask = date + " - " + taskText;
} else if (time) {
    fullTask = time + " - " + taskText;
} else {
    fullTask = taskText;
}

    tasks.push(fullTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(fullTask);

    input.value = "";
}

// Create task UI
function createTaskElement(task) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = task;

    // Mark complete
    span.onclick = function () {
        span.classList.toggle("completed");
    };

    // Edit
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    editBtn.onclick = function () {
        let newTask = prompt("Edit task:", span.innerText);
        if (newTask) {
            span.innerText = newTask;

            let index = tasks.indexOf(task);
            if (index !== -1) {
                tasks[index] = newTask;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }
    };

    // Delete
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";

    deleteBtn.onclick = function () {
        li.remove();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});