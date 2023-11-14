// todo-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  inputValue: string = '';
  newTodo: Todo = {
    title: '',
    description: '',
    done: false,
  };
   // Track the selected todo for editing
   selectedTodo: Todo | null = null;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(private todoService: TodoService, public dialog: MatDialog) {}
  
  
 ngOnInit(): void {
  
  if(this.selectedTodo){
    this.inputValue = this.selectedTodo.title
  }
  this.refreshTodos();
}
  

  refreshTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      
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
    if (this.inputValue.trim()) {
      this.newTodo.title = this.inputValue.trim();
      this.todoService.addNewTodo(this.newTodo).subscribe(() => {
        this.inputValue = '';
        this.refreshTodos();
      });
    }
  }

  editTodo(todo: Todo): void {
    this.selectedTodo = todo;
  }

  saveEdit(): void {
   
    if (this.selectedTodo) {
      this.todoService.editTodo(this.selectedTodo).subscribe(() => {
        this.selectedTodo = null;
        this.refreshTodos();
      });
    }
  }

  openConfirmationDialog(todo: Todo): void {
    this.selectedTodo = todo;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this todo?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Pass the selectedTodo to deleteTodo
        this.deleteTodo(this.selectedTodo);
      }
    });
  }
  
  deleteTodo(todo: Todo | null = null): void {
    
    if (todo) {
      const todoId = todo._id;
  
      if (todoId) {
        this.todoService.deleteTodoById(todoId).subscribe({
          next: () => {
            console.log('Todo deleted:', todo);
            this.refreshTodos();
          },
          error: (error) => {
            console.error('Error deleting todo:', error);
          },
        });
      } else {
        console.error('Todo ID is undefined or null');
      }
    } else {
      console.error('Selected todo is undefined or null');
    }
}

updateTodoStatus(todo : Todo | null): void {
  todo
  if (todo) {
    const todoId = todo._id;

    if (todoId) {
      this.todoService.updateTodoStatus(todo, todoId).subscribe(() => {
        // Assuming you want to do something here after updating the status
        
        this.refreshTodos();
      });
    } else {
      console.error('Todo ID is undefined or null');
    }
  } else {
    console.warn('Selected todo is undefined or null. Skipping update.');
    // You might want to log a warning or take other appropriate actions here.
  }
}




  
  // addDescription(): void{
  //   if(this.inputValue.trim() && this.selectedTodo){
  //     this.selectedTodo.description = this.inputValue.trim()
  //     this.inputValue = ''; 
  //   }

  // }
}
  
  
  

  

