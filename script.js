const newTaskInput = document.querySelector('.input-btn input');
const addBtn = document.querySelector('#add-btn'); 
const tasksContainer = document.querySelector('#tasks');
const countVal = document.querySelector('.count-value');
const error = document.querySelector('.error');


let taskscount = 0;
function displayCount(taskscount) {
    countVal.innerText = taskscount;
    setData();
}

function addTask() {
    let taskName  = newTaskInput.value.trim();
    error.style.display = "none";
    if(!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        },200);
        return;
    }

    let task = `<div class="task">
        <input type="checkbox" class="task-check">
            <span class="task-name">${taskName}</span>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>`;
    tasksContainer.insertAdjacentHTML("beforeend", task);
    newTaskInput.value = "";
    
    

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
        taskscount -= 1;
        displayCount(taskscount);
        }
        setData();
    });

    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((editBtn) => {
        editBtn.onclick = ( (e) => {
            const targetElement = e.target;
            if(!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;

            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;

            targetElement.parentNode.remove();


            taskscount -= 1;
            displayCount(taskscount);
        } );
        setData();
    });

    const checkBoxes = document.querySelectorAll('.task-check');
    checkBoxes.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle('completed');
            if(checkBox.checked){
                taskscount -= 1;
            }
            else{
                taskscount += 1;
            }
            displayCount(taskscount);
        }
    });
        taskscount += 1;
    displayCount(taskscount);
    newTaskInput.value = "";
    setData();

}

addBtn.addEventListener('click', addTask);


window.onload = () => {
    taskscount = 0;
    displayCount(taskscount);
    newTaskInput.value = '';
    setData();
}

function setData() {
    localStorage.setItem('Tasks', tasksContainer.innerHTML);
}

function showData() {
    const data = localStorage.getItem('Tasks');
    console.log(data);
    if(data) {
        tasksContainer.innerHTML = data;
    }
}
showData();