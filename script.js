const todoNameInput = document.getElementById("todo-name");
const listContainer = document.getElementById("list-container");
const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");
const clearAllButton = document.getElementById("clear-all");


function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    listContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add(task.status);
        
        
        li.innerHTML = `
            ${task.name} 
            <span class="delete-task">&#10006;</span> 
        `;
        
        
        listContainer.appendChild(li);

        
        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            task.status = li.classList.contains("checked") ? "complete" : "incomplete";
            saveData();
        });

        
        const deleteButton = li.querySelector(".delete-task");
        deleteButton.addEventListener("click", function (e) {
            e.stopPropagation();
            deleteTask(index);
        });
    });
}


function saveData() {
    const tasks = [];
    const listItems = listContainer.querySelectorAll("li");

    listItems.forEach((item) => {
        const taskName = item.textContent.replace("❌", "").trim();
        const taskStatus = item.classList.contains("checked") ? "complete" : "incomplete";
        tasks.push({ name: taskName, status: taskStatus });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTask() {
    const name = todoNameInput.value.trim();

    if (name === '') {
        alert("You must write something");
    } else {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const newTask = { name, status: "incomplete" };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        
        showTasks();
    }

    todoNameInput.value = "";
}


function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    
    showTasks();
}


function searchTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const tasks = listContainer.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        const taskName = tasks[i].textContent.toLowerCase();

        if (taskName.includes(searchTerm)) {
            tasks[i].style.display = "flex";
        } else {
            tasks[i].style.display = "none";
        }
    }
}


function filterStatus() {
    const filterValue = statusFilter.value;
    const tasks = listContainer.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
        const taskStatus = tasks[i].classList.contains("checked") ? "complete" : "incomplete";

        if (filterValue === "all" || filterValue === taskStatus) {
            tasks[i].style.display = "flex";
        } else {
            tasks[i].style.display = "none";
        }
    }

    
    searchInput.disabled = false;

    
    if (searchInput.value !== "") {
        searchTasks();
    }
}


function clearAllTasks() {
    localStorage.setItem("tasks", JSON.stringify([]));
    showTasks();
}


function resetSearchAndFilter() {
    searchInput.value = "";
    statusFilter.value = "all";
    searchInput.disabled = false;
    statusFilter.disabled = false;
    showTasks();
}


todoNameInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

searchInput.addEventListener("input", function () {
    if (searchInput.value === "") {
        resetSearchAndFilter();
    } else {
        searchTasks();
    }
});

statusFilter.addEventListener("change", function () {
    filterStatus();
});

clearAllButton.addEventListener("click", function () {
    clearAllTasks();
});


showTasks();
