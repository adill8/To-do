const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const taskList = document.getElementById("taskList");
const btnAdd = document.getElementById("add-btn");

let editMode = false;
let update = null;
function addTask() {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (!title || !desc) {
    alert("Title is required");
    return;
  }

  //   Task List
  if (editMode && update) {
    update.querySelector("h3").textContent = title;
  update.querySelector("p").textContent = desc;

    btnAdd.textContent = "Add Task";
    editMode = false;
    update = null;
  } else {
    const task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `
    <div class="task-content">
      <input type="checkbox" />
      <div class="text">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    </div>
    <div class="task-actions">
      <button class="edit-btn">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="del-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

    taskList.appendChild(task);
  }
  // Clear input fields
  titleInput.value = "";
  descInput.value = "";
}


taskList.addEventListener("click", function (e) {

// Edit Task
  if (e.target.closest(".edit-btn")) {
    const editTask = e.target.closest(".task");

    const title = editTask.querySelector("h3").innerText;
    const desc = editTask.querySelector("p").innerText;

    titleInput.value = title;
    descInput.value = desc;
    btnAdd.textContent = "Update Task";

    editMode= true;
    update = editTask;
  }

  // Task Remove
  if(e.target.closest(".del-btn")){
    const delTask = e.target.closest(".task");
  delTask.remove();
  }
});
