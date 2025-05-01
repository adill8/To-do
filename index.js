const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const taskList = document.getElementById("taskList");
const btnAdd = document.getElementById("add-btn");
const btnToggle = document.getElementById("Toggle-btn");
const body = document.body;

let editMode = false;
let update = null;

// Add Task
function addTask() {
  const title = titleInput.value;
  const desc = descInput.value;

  if (!title || !desc) {
    alert("Title and Description is required");
    return;
  }

  // Dublicated checked

  let isDublicate = false;
  const tasks = document.querySelectorAll(".task");

  for(let i = 0; i < tasks.length; i++){
    const taskTitle = tasks[i].querySelector("h3").innerText;
    const taskDescription = tasks[i].querySelector("p").innerText;

    if(taskTitle === title && taskDescription === desc){
      isDublicate = true;
      break;
    }
  }

  if(isDublicate){
    alert("This task already exits");
  return;
  }

  //   Task List with Time

  const timestamp = new Date().toLocaleString();

  if (editMode && update) {
    update.querySelector("h3").textContent = title;
  update.querySelector("p").textContent = desc;
  update.querySelector(".timestamp").textContent = `Created at: ${timestamp}`;

    btnAdd.textContent = "Add Task";
    editMode = false;
    update = null;
    saveData();
  } else {
    const task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `
    <div class="task-content">
      <input type="checkbox" class="task-checkbox" />
      <div class="text">
        <h3>${title}</h3>
        <p>${desc}</p>
        <span class="timestamp">Created at: ${timestamp}</span> 
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
    saveData();
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
  saveData();
  }
});

// Task Completed
taskList.addEventListener("change", function(e){
  if(e.target.type === "checkbox"){
    const task = e.target.closest(".task");

    const isChecked = e.target.checked;

    if(isChecked){
      task.classList.add("completed")
    }
    else{
      task.classList.remove("completed")
    }

    const buttons = task.querySelector(".task-actions");

    if(isChecked){
      buttons.style.display = "none";

    }
    else{
      buttons.style.display = "flex";
    }
    saveData();
  }
});

// Local Storage Data
function saveData(){
    localStorage.setItem("data",  taskList.innerHTML);
}

// Show Data
function showTask(){
  taskList.innerHTML = localStorage.getItem("data");
}
showTask();

// Dark Mode Section
btnToggle.addEventListener("click", function(){
  body.classList.toggle("dark-mode");

  if(body.classList.contains("dark-mode")){
    btnToggle.textContent = "Light Mode";
  }
  else{
    btnToggle.textContent = "Dark Mode";
  }
})

