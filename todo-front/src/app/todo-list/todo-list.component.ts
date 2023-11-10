import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model'; // Import the Todo interface
import {MatMenuTrigger} from '@angular/material/menu'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  inputValue: string = '';
  newTodo: Todo = {
   
    title: '',
    description: '',
    done: false,
  };
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos)=>{
      this.todos = todos
      console.log(todos)
    })
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log(todos);
    });
  }

  openMenu(event: MouseEvent, todo: Todo): void {
    event.stopPropagation();
    if (this.menuTrigger) {
      this.menuTrigger.menuData = { todo };
      this.menuTrigger.openMenu();
    }
  }

  addTodo() {
    // Check if the input value is not empty
    if (this.inputValue.trim()) {
      // Set the title of the newTodo using the input value
      this.newTodo.title = this.inputValue.trim();

      // Call the addNewTodo function from the service
      this.todoService.addNewTodo(this.newTodo).subscribe((newTodo) => {
        // Assuming the server responds with the newly created todo
        console.log('New Todo added:', newTodo);

        // Clear the input value
        this.inputValue = '';
        this.refreshTodos();

        // Refresh the list of todos
        
      });
    }
  }
}
