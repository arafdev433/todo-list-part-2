
const taskForm = document.querySelector('#taskForm');
const errMsg = document.querySelector('#errMsg');
const showTask = document.querySelector('#showTask');


taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(taskForm);
    const task = formData.get('task');

    if(!task) {
        errMsg.textContent = 'Please provide your task'
    }
    else {
        if(localStorage.getItem("todo")) {
            const preData = localStorage.getItem("todo");
            const arr = JSON.parse(preData);
            const newTask = {
                task: task,
                isComplete: false
            };
            arr.push(newTask);
            localStorage.setItem("todo", JSON.stringify(arr));
        }
        else {
            const newTask = [{
                task: task,
                isComplete: false
            }];
            localStorage.setItem("todo", JSON.stringify(newTask));
        }
        addTask(task);
        taskForm.reset();
    };
});
const completed = e => {
    const selectedTask = Array.from(e.parentElement.parentElement.parentElement.children).indexOf(e.parentElement.parentElement);
    const preData = localStorage.getItem("todo");
    const arr = JSON.parse(preData);
    arr[selectedTask].isComplete = true;
    localStorage.setItem("todo", JSON.stringify(arr));
}

const deleteTask = e => {
    const selectedTask = Array.from(e.parentElement.parentElement.parentElement.children).indexOf(e.parentElement.parentElement);
    const preData = localStorage.getItem("todo");
    const arr = JSON.parse(preData);
    arr.splice(selectedTask, 1);
    localStorage.setItem("todo", JSON.stringify(arr));
}

const addTask = (task, isComplete = false) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.textContent = task;
        const div = document.createElement('div');
        const isDisabled = isComplete ? 'disabled':null;
        isComplete ? p.classList.add('line-through'):null;
        div.innerHTML = `
            <button class="border aspect-square text-white bg-amber-500 hover:bg-green-300 disabled:bg-gray-500" onClick="this.setAttribute('disabled', true); this.parentElement.previousElementSibling.classList.add('line-through'); completed(this);"><i class="fa-solid fa-check"></i></button>

            <button class="border aspect-square text-white bg-red-300 hover:bg-red-500" onClick="deleteTask(this); this.parentElement.parentElement.remove();"><i class="fa-solid fa-trash"></i></button>
        `;
        li.appendChild(p);
        li.appendChild(div);
        showTask.appendChild(li);
};

const showTaskFromData = () => {
    const preData = localStorage.getItem("todo");
    const arr = JSON.parse(preData);
    arr.forEach(task => {
        addTask(task. task);
    });
}
showTaskFromData();





/*
target হলো যে element-এ click হয়েছে।
array.splice(startIndex, deleteCount);
*/