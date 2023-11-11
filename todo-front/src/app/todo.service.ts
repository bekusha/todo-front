import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos/'
  constructor(private http: HttpClient) { }
  
  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }
  
  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}${id}`);
  }
  
  addNewTodo(newTodo: Todo): Observable<Todo[]>{
    return this.http.post<Todo[]>(`${this.apiUrl}new`, newTodo)
  }

  editTodo(todo:Todo): Observable<Todo>{
    return this.http.put<Todo>(`${this.apiUrl}${todo._id}`, todo);
  }
 
  deleteTodoById(todoId: string): Observable<void> {
    const url = `${this.apiUrl}${todoId}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: any) => {
        console.error('Error deleting todo:', error);
        throw error;
      })
    );
  }

}
