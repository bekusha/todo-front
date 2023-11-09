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
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos)=>{
      this.todos = todos
      console.log(todos)
    })
  }

  openMenu(event: MouseEvent, todo: Todo): void {
    event.stopPropagation();
    if (this.menuTrigger) {
      this.menuTrigger.menuData = { todo };
      this.menuTrigger.openMenu();
    }
  }

}
