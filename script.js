let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";
let editIndex = null;

const modal = new bootstrap.Modal(document.getElementById('mainModal'));

function addTask() {
  const input = taskInput.value.trim();
  if (!input) return;
  tasks.push({ text: input, done: false });
  taskInput.value = "";
  save();
}

function render() {
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    if (filter === "done" && !t.done) return;
    if (filter === "todo" && t.done) return;

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <span class="${t.done ? 'done' : ''}">${t.text}</span>
      <div>
        <input type="checkbox" ${t.done ? "checked" : ""} onchange="toggle(${i})">
        <button class="icon-btn icon-yellow" onclick="editTask(${i})">
          <i class="fa fa-pen"></i>
        </button>
        <button class="icon-btn icon-red" onclick="deleteTask(${i})">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  save();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  save();
}

function filterTasks(f) {
  filter = f;
  render();
}

function confirmDeleteDone() {
  modalTitle.innerText = "Delete Done Tasks";
  modalText.innerText = "Are you sure you want to delete all completed tasks?";
  editInput.classList.add("d-none");
  confirmBtn.onclick = () => {
    tasks = tasks.filter(t => !t.done);
    save();
    modal.hide();
  };
  modal.show();
}

function confirmDeleteAll() {
  modalTitle.innerText = "Delete All Tasks";
  modalText.innerText = "Are you sure you want to delete all tasks?";
  editInput.classList.add("d-none");
  confirmBtn.onclick = () => {
    tasks = [];
    save();
    modal.hide();
  };
  modal.show();
}

function editTask(i) {
  editIndex = i;
  modalTitle.innerText = "Rename Task";
  modalText.innerText = "";
  editInput.value = tasks[i].text;
  editInput.classList.remove("d-none");
  confirmBtn.onclick = saveEdit;
  modal.show();
}

function saveEdit() {
  tasks[editIndex].text = editInput.value;
  save();
  modal.hide();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

render();
