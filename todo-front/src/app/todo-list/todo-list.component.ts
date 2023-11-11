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
  selectedTodo: Todo | null = null; // Track the selected todo for editing

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(private todoService: TodoService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log(todos);
    });
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

  editTodo(todo: Todo): void {
    this.selectedTodo = todo;
  }

  saveEdit(): void {
    if (this.selectedTodo) {
      // Call the editTodo function from the service
      this.todoService.editTodo(this.selectedTodo).subscribe((updatedTodo) => {
        console.log('Todo updated:', updatedTodo);

        // Reset the selected todo after editing
        this.selectedTodo = null;
      });
    }
  }

  deleteTodo(): void {
  if (this.selectedTodo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this todo?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const todoId = this.selectedTodo?._id; 
        if (todoId) {
          this.todoService.deleteTodoById(todoId).subscribe(() => {
            console.log('Todo deleted:', this.selectedTodo);
            this.selectedTodo = null;
            this.refreshTodos();
          });
        } else {
          console.error('Todo ID is undefined or null');
        }
      }
    });
  }
}

openConfirmationDialog(): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '250px', // Set the width of your dialog
  });

  dialogRef.afterClosed().subscribe(result => {
    // Check the result when the dialog is closed
    if (result) {
      // User clicked 'Yes' in the confirmation dialog
      // Perform the delete action or any other irreversible action here
      this.deleteTodo();
    }
  });
}



}
