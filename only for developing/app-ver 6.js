var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            complited: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
    	this.todos.splice(position, 1);
    },
    toggleComplited: function(position) {
        var todo = this.todos[position];
        todo.complited = !todo.complited;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var complitedTodos = 0;

            // Get a number of complited todos
//        for (var i = 0; i < totalTodos; i++) {
//            if (this.todos[i].complited === true) {
//                complitedTodos++;
//            }
//        }
      
        this.todos.forEach(function(todo) {
          if (todo.complited === true) {
            complitedTodos++;
          }
        });
            // Case 1: If everything is true, make everything false
        if (complitedTodos === totalTodos) {
//            for (var i = 0; i < totalTodos; i++) {
//                this.todos[i].complited = false;
//            }
            this.todos.forEach(function(todo) {
              todo.complited = false;
            });
          
            // Case 2: Otherwise, make everything true
        } else {
//            for (var i = 0; i < totalTodos; i++) {
//                    this.todos[i].complited = true;   
//            }
          this.todos.forEach(function(todo) {
              todo.complited = true;
          });
          
        }

    }
};

var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleComplited: function() {
        var toggleComplitedPositionInput = document.getElementById('toggleComplitedPositionInput');
        todoList.toggleComplited(toggleComplitedPositionInput.valueAsNumber);
        toggleComplitedPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
}

const view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        for (var i = 0; i < todoList.todos.length; i++) {
            var todoLi = document.createElement('li');
            var todo = todoList.todos[i];
            var todoTextWithCompletion = '';

            if (todo.complited === true) { 
            todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
            todoTextWithCompletion = '( )  ' + todo.todoText;
            }

            todoLi.id = i;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
          // Get elemnt that was clicked on.
          var elementClicked = event.target;
          // Check if elementClicked is a delete button.
          if (elementClicked.className === 'deleteButton') {
            handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
          }
        });
    }
};
view.setUpEventListeners();

