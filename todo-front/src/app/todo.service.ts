import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://tdappapi.onrender.com/todos/'
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
 
  deleteTodoById(id: string): Observable<void> {
    console.log('delete service working')
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
    
  }

  updateTodoStatus(todo:Todo | null, todoId:string | null): Observable<any> {
    // Implement the logic to update the status of a todo in the backend
    return this.http.put(`${this.apiUrl}/${todoId}`, todo);
  }

}
