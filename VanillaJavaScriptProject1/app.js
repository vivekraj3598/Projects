//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

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
    saveLocalTodos(todoInput.value);

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
        removeLocalTodos(todo);

        //Finally remove the element
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //if check mark button is clicked
    if(item.classList[0] === "complete-btn"){
        todo.classList.toggle('completed')
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
                    console.log('completed');
                    todo.style.display = 'flex';
                }
                else{
                    console.log("uncompleted");
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

// Save new todos to local storage
function saveLocalTodos(todo){
    // Check if we have any todo in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //Save new todo in local storage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load saved todos from local storage
function getTodos(){
    
    // Check if we have any todo in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){

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
}

function removeLocalTodos(todo){

    // Check if we have any todo in local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // Getting text in the li element being deleted
    const todoIndex = todo.children[0].innerText;

    //Deleting the array element
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}