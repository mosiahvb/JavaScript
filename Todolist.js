function setupTodoList(todoListClass) {
    // selector's - pulls from the HTML objects to be used and to give the HTML life
    const todoInput = document.querySelector(`.${todoListClass} .todo-input`);
    const todoButton = document.querySelector(`.${todoListClass} .todo-button`);
    const todoList = document.querySelector(`.${todoListClass} .todo-list`);

    // Holds the todo items in an array
    const todoItems = [];

    // event listener(for the buttons)- look for an action to produce the wanted result
    todoButton.addEventListener("click", (event) => addTodo(event, todoListClass));
    todoList.addEventListener("click", deleteCheck);


    function addTodo(event, listClass) {
        event.preventDefault();

        // Creates a todo div, and adds a new item
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");


        // Creates a li to display the item
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");

        // Add to the changes to the HTML
        todoDiv.appendChild(newTodo);

        // Creating a checkmark button 
        const completedButton = document.createElement('button');
        // this is where the checkmark icon comes from, pulling it from the library of icons
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        // adding a reference to call action after checkmark has been hit
        completedButton.classList.add("complete-btn");
        
        // Appending to the HTML
        todoDiv.appendChild(completedButton);

        // Creating the trash button
        const trashButton = document.createElement('button');
        // trash icon image 
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        
        todoDiv.appendChild(trashButton);

        // adding the new to do item onto the to do list 
        document.querySelector(`.${listClass} .todo-list`).appendChild(todoDiv);

        // ads the new todo item to the array
        todoItems.push({
            text: todoInput.value,
            completed: false
        });

        // Shows the current list of items 
        const itemTexts = todoItems.map(item => item.text);
        console.log(`Current todo items: ${itemTexts}`);

        // Clears the previous text from bar
        todoInput.value = "";
    }

    function deleteCheck(e) {
        const item = e.target;
        // delete todo
        if (item.classList[0] === "trash-btn") {
            const todo = item.parentElement;
            // Adding the falling animation to remove items. 
            todo.classList.add("fall");
            todo.addEventListener("transitionend", function () {
                todo.remove();
            });
        }

        // Activates the completed part of the checkmark, adding the graphics
        // displaying a line through the finished item
        if (item.classList[0] === "complete-btn") {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
    }

    function recursiveLogClass(element) {
        console.log(element.className);

        // Uses recursion to help identify placement for debugging
        for (let child of element.children) {
            recursiveLogClass(child);
        }
    }
    const todoListContainer = document.querySelector('.todo-list-container');
    recursiveLogClass(todoListContainer);
}

// Runs the functions to create three separate to do list
setupTodoList("work-list");
setupTodoList("school-list");
setupTodoList("home-list");