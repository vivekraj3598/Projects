//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getUncompletedTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions

function addToDo(event){
    //prevent form from submitting
    event.preventDefault();

    //ToDo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item', 'd-inline');
    //Add li to div as a child
    todoDiv.appendChild(newTodo);

    // Add/Save todo to local storage
    saveLocalUncompletedTodos(todoInput.value);

    //Create CheckMark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check"></i>';
    completedButton.classList.add("complete-btn");
    //Add completedbutton to li as a child
    todoDiv.appendChild(completedButton)

    //Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    //Add deleteButton to li as a child
    todoDiv.appendChild(deleteButton)

    //Append to List
    todoList.appendChild(todoDiv)

    //Clear ToDo Input Value
    todoInput.value = "";
}


function deleteCheck(event){
    //event.target only detects events of elements created by javascript
    // which is the delete button
    const item = event.target;

    //We get the parent div element for the delete button
    const todo = item.parentElement;

    //Deleting element div if delete button is clicked
    if(item.classList[0] === 'delete-btn'){
        //Animation
        todo.classList.add('fall');
        //Delete from local Storage
        removeLocalUncompletedTodos(todo);

        //Finally remove the element
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //if check mark button is clicked
    if(item.classList[0] === "complete-btn"){
        todo.classList.toggle('completed');
        toggleCompleted(todo);
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all':
                //We have used flex to maintain format
                //Try block to know the difference
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

////////////////////////////////////////////////////
//Saving in local Storage
////////////////////////////////////////////////////

// Save new uncompleted todos to local storage
function saveLocalUncompletedTodos(todo){
    // Check if we have any todo in local storage
    let uncompletedtodos;
    if(localStorage.getItem('uncompletedtodos') === null){
        uncompletedtodos = [];
    }
    else{
        uncompletedtodos = JSON.parse(localStorage.getItem('uncompletedtodos'));
    }

    //Save new todo in local storage
    uncompletedtodos.push(todo);
    localStorage.setItem('uncompletedtodos', JSON.stringify(uncompletedtodos));
}

// Load saved uncompleted todos from local storage
function getUncompletedTodos(){
    
    // Check if we have any todo in local storage
    let uncompletedtodos;
    let completedtodos;

    if(localStorage.getItem('uncompletedtodos') === null){
        uncompletedtodos = [];
    }
    else{
        uncompletedtodos = JSON.parse(localStorage.getItem('uncompletedtodos'));
    }

    if(localStorage.getItem('completedtodos') === null){
        completedtodos = [];
    }
    else{
        completedtodos = JSON.parse(localStorage.getItem('completedtodos'));
    }

    uncompletedtodos.forEach(function(todo){

        //ToDo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item', 'd-inline');
        //Add li to div as a child
        todoDiv.appendChild(newTodo);

        //Create CheckMark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check"></i>';
        completedButton.classList.add("complete-btn");
        //Add completedbutton to li as a child
        todoDiv.appendChild(completedButton)

        //Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        //Add deleteButton to li as a child
        todoDiv.appendChild(deleteButton)

        //Append to List
        todoList.appendChild(todoDiv)
    });

    completedtodos.forEach(function(todo){

        //ToDo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo', 'completed');

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item', 'd-inline');
        //Add li to div as a child
        todoDiv.appendChild(newTodo);

        //Create CheckMark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check"></i>';
        completedButton.classList.add("complete-btn");
        //Add completedbutton to li as a child
        todoDiv.appendChild(completedButton)

        //Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        //Add deleteButton to li as a child
        todoDiv.appendChild(deleteButton)

        //Append to List
        todoList.appendChild(todoDiv)
    });
}

function toggleCompleted(todo){
    let uncompletedtodos;
    let completedtodos;

    if(localStorage.getItem('uncompletedtodos') === null){
        uncompletedtodos = [];
    }
    else{
        uncompletedtodos = JSON.parse(localStorage.getItem('uncompletedtodos'));
    }

    if(localStorage.getItem('completedtodos') === null){
        completedtodos = [];
    }
    else{
        completedtodos = JSON.parse(localStorage.getItem('completedtodos'));
    }

    //Main implementation
    if(todo.classList.contains('completed')){
        console.log('completed');

        //Deleting from uncompleted
        //Getting text in the li element being deleted
        const todoIndex = todo.children[0].innerText;
        //Deleting the array element
        uncompletedtodos.splice(uncompletedtodos.indexOf(todoIndex), 1);

        //Adding to completed
        completedtodos.push(todoIndex);
    }
    else{
        console.log('uncompleted');

        //Deleting from completed 
        //Getting text in the li element being deleted
        const todoIndex = todo.children[0].innerText;
        //Deleting the array element
        completedtodos.splice(completedtodos.indexOf(todoIndex), 1);

        //Adding to uncompleted
        uncompletedtodos.push(todoIndex);
    }

    localStorage.setItem('completedtodos', JSON.stringify(completedtodos));
    localStorage.setItem('uncompletedtodos', JSON.stringify(uncompletedtodos));
}

// function completedToUncompleted(todo){

// }

//Remove uncompleted Todos when trash button pressed
// function removeLocalUncompletedTodos(todo){

//     // Check if we have any todo in local storage
//     let uncompletedtodos;
//     if(localStorage.getItem('uncompletedtodos') === null){
//         uncompletedtodos = [];
//     }
//     else{
//         uncompletedtodos = JSON.parse(localStorage.getItem('uncompletedtodos'));
//     }

//     // Getting text in the li element being deleted
//     const todoIndex = todo.children[0].innerText;

//     //Deleting the array element
//     uncompletedtodos.splice(uncompletedtodos.indexOf(todoIndex), 1);

//     localStorage.setItem('uncompletedtodos', JSON.stringify(uncompletedtodos));
// }

function removeLocalUncompletedTodos(todo){

    // Check if we have any todo in local storage
    let uncompletedtodos;
    let completedtodos;

    if(localStorage.getItem('uncompletedtodos') === null){
        uncompletedtodos = [];
    }
    else{
        uncompletedtodos = JSON.parse(localStorage.getItem('uncompletedtodos'));
    }

    if(localStorage.getItem('completedtodos') === null){
        completedtodos = [];
    }
    else{
        completedtodos = JSON.parse(localStorage.getItem('completedtodos'));
    }

    // Getting text in the li element being deleted
    const todoIndex = todo.children[0].innerText;

    //Deleting the array element
    if(todo.classList.contains('completed')){
        completedtodos.splice(completedtodos.indexOf(todoIndex), 1);
    }
    else{
        uncompletedtodos.splice(uncompletedtodos.indexOf(todoIndex), 1);
    }

    localStorage.setItem('uncompletedtodos', JSON.stringify(uncompletedtodos));
    localStorage.setItem('completedtodos', JSON.stringify(completedtodos));
}