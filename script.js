let todos = [];
let filter = "all";
let editIndex = null;

const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

document.getElementById("addBtn").onclick = () => {
    if (input.value.trim() === "") return;
    todos.push({ text: input.value, done: false });
    input.value = "";
    render();
};

function render() {
    list.innerHTML = "";

    todos
        .filter(t =>
            filter === "all" ||
            (filter === "done" && t.done) ||
            (filter === "todo" && !t.done)
        )
        .forEach((todo, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${todo.done ? 'done' : ''}">
                    ${todo.text}
                </span>
                <div class="icons">
                    <input type="checkbox" ${todo.done ? "checked" : ""}
                        onchange="toggleDone(${index})">
                    <button onclick="editTodo(${index})">✏️</button>
                    <button onclick="deleteTodo(${index})">🗑️</button>
                </div>
            `;
            list.appendChild(li);
        });
}

function toggleDone(index) {
    todos[index].done = !todos[index].done;
    render();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}

function editTodo(index) {
    editIndex = index;
    document.getElementById("renameInput").value = todos[index].text;
    openModal("renameModal");
}

function saveRename() {
    const value = document.getElementById("renameInput").value.trim();
    if (value !== "") {
        todos[editIndex].text = value;
        render();
    }
    closeModal();
}

function filterTasks(type) {
    filter = type;
    render();
}

function deleteDone() {
    openModal("deleteModal");
}

function confirmDeleteDone() {
    todos = todos.filter(t => !t.done);
    render();
    closeModal();
}

function deleteAll() {
    todos = [];
    render();
}

function openModal(id) {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById(id).classList.remove("hidden");
}

function closeModal() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("renameModal").classList.add("hidden");
    document.getElementById("deleteModal").classList.add("hidden");
}
