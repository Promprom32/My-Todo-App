const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),

    taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));

// console.log(todos)

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector('span.active').classList.remove('active');
 btn.classList.add('active');
 
        // console.log(btn)
        // console.log(btn.innerHTML)
        // if (btn.innerHTML === 'Pending') {
        //     // console.log('guy')
        //     todos = todos.filter(item => item.status === 'pending').map((item) => {
        //         return item;
        //     })
        //     console.log(todos)
        //     showTodo()
        // }
        // if (btn.innerHTML === 'Completed') {
        //     console.log('guy')
        //     todos = todos.filter(item => item.status === 'completed').map((item) => {
        //         return item;
        //     })
        //     showTodo()
        // }
    });

});


function showTodo() {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            li += `<li class="task">
            <label for="${id}">
              <input  onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
              <p class="${isCompleted}">${todo.name}</p>
            </label>
            <div class="settings">
              <i onclick="showMenu(this)" class="fa fa-ellipsis-h"></i>
              <ul class="task-menu">
                <li onclick="editTask(${id}, '${todo.name}')"><i class="fas fa-pen"></i>Edit</li>
                <li onclick="deleteTask(${id})"><i class="fa fa-trash"></i>Delete</li>
              </ul>
            </div>
          </li>`;
        });
    }
    taskBox.innerHTML = li;
}
showTodo();
function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }

    })
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}


function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}



taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    ;
    if (e.key == "Enter" && userTask) {
        if (!isEditedTask) {
            if (!todos) {
                todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        }
        else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }

        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
})