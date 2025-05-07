const inputText = document.getElementById("titleInput");
const descriptionText = document.getElementById("description");
const btnAdd = document.getElementById("btn-Add");
const taskList = document.getElementById("taskList");


let editMode = false;
let updateText = null;
btnAdd.addEventListener("click", AddTask);

function AddTask(){
    const titleValue = inputText.value.trim();
    const descriptionValue = descriptionText.value.trim();

    if(!titleValue || !descriptionValue){
        alert("Task Name and Description must b required")
        return;
    }

    let isDuplicate = false;
    const tasks = document.querySelectorAll(".task");

    for(const task of tasks){
        const inputTask = task.querySelector("h3").innerText;
        const inputDescrition = task.querySelector("p").innerText;

        if(inputTask === titleValue || inputDescrition === descriptionValue){
            isDuplicate = true;
            break;
        }
    }

    if(isDuplicate){
        alert("This Task already exits");
        return;
    }




if(editMode && updateText){
    function q(s) {
        return updateText.querySelector(s);
    }

    q("h3").textContent = titleValue;
    q("p").textContent = descriptionValue;

    btnAdd.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editMode = false;
    updateText = null;
}
else{
    const task = document.createElement("li");

    task.className ="task";
    task.innerHTML = `
  <div class="task-content">
    <input type="checkbox" class="task-checkbox" />
    <div class="text">
      <h3>${titleValue}</h3>
      <p>${descriptionValue}</p>
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
          inputText.value = "";
          descriptionText.value = "";
}

taskList.addEventListener("click", function(e){

    const delBtn = e.target.closest(".del-btn") 
    if(delBtn){
        const task = delBtn.closest(".task");
        task.remove();
        return;
    }

    const editBtn = e.target.closest(".edit-btn")
    if(!editBtn){
        return;
    }

    const task = editBtn.closest(".task");
    if(!task){
        return;
    }

    inputText.value = task.querySelector("h3").innerText;
    descriptionText.value = task.querySelector("p").innerText;

    btnAdd.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editMode = true;
    updateText= task;
   
});

taskList.addEventListener("change", function(e){
    if(e.target.type !== "checkbox"){
        return;
    }

    const task = e.target.closest(".task")
    const isChecked = e.target.checked;
    const buttons = task.querySelector(".task-actions");

    task.classList.toggle("completed", isChecked);
    buttons.style.display = isChecked ? "none" : "flex";
})