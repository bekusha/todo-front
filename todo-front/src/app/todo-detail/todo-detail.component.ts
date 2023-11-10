// todo-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('_id');
  
    if (id !== null) {
      this.todoService.getTodoById(id).subscribe((todo) => {
        this.todo = todo;
      });
    } else {
      console.error("ID is null");
    }
  }
  
}
