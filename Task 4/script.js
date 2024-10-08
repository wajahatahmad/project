const taskInput = document.getElementById('task-input');
const datetimeInput = document.getElementById('datetime-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value;
    const taskDateTime = datetimeInput.value;

    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskContent = document.createElement('span');
    taskContent.textContent = `${taskText} (Due: ${taskDateTime})`;

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        const newTaskText = prompt('Edit task:', taskText);
        const newTaskDateTime = prompt('Edit date & time:', taskDateTime);
        if (newTaskText !== null) {
            taskContent.textContent = `${newTaskText} (Due: ${newTaskDateTime})`;
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeBtn);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    taskInput.value = '';
    datetimeInput.value = '';
}
