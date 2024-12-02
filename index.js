const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const tasksUL= document.getElementById("tasks");
const message = document.getElementById("message");
const messageBtn = document.getElementById("message-btn");
let taskData = getTask();
updateTask();
addBtn.addEventListener("click",() => {
    if(taskInput.value === ""){
        message.style.display = "flex";
        messageBtn.addEventListener("click", () => {
            message.style.display = "none";
        })
    }
    else{
        addTask();
        taskInput.value = '';
    }
});
function addTask() {
    taskData.push(taskInput.value);
    updateTask();
    saveTask();
}
function updateTask() {
    tasksUL.innerHTML = "";
    taskData.forEach((task,taskIndex )=> {
        const taskElement = createTask(task, taskIndex);
        tasksUL.append(taskElement);
        
    });
}
function createTask(task, taskIndex) {
    const taskLI = document.createElement("li");
    taskLI.className = "task";
    taskLI.innerHTML = `
      <p>${task}</p>
      <button id="task-${taskIndex}" class="delete-btn" onclick="deleteTask(${taskIndex})">
        <i class="fa fa-trash"></i>
      </button>
    `;
    
    
    return taskLI

}

function deleteTask(taskIndex) {
    taskData.splice(taskIndex, 1);
    saveTask()
    updateTask()
    
}
function saveTask() {
    const taskJson = JSON.stringify(taskData);
    localStorage.setItem("tasks",taskJson);


}
function getTask(){
    const tasks = localStorage.getItem("tasks") || "[]";
    return JSON.parse(tasks);

}
