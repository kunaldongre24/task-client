import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ToDo from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class ToDoHttpService {
  private ApiURL: string = 'https://api2.fly247.in/api/v2/task';

  constructor(private httpclient: HttpClient) {}

  getToDos(): Observable<ToDo[]> {
    return this.httpclient.get<ToDo[]>(`${this.ApiURL}/getTasks`);
  }
  getToDoById(id: string): Observable<ToDo> {
    return this.httpclient.get<ToDo>(`${this.ApiURL}/getTask/${id}`);
  }

  getToDoHistoryById(id: string): Observable<any> {
    return this.httpclient.get<any>(`${this.ApiURL}/getTaskHistory/${id}`);
  }

  createToDo(payload: ToDo): Observable<ToDo> {
    return this.httpclient.post<ToDo>(`${this.ApiURL}/createTask`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateToDo(id: string, payload: ToDo): Observable<ToDo> {
    return this.httpclient.put<ToDo>(
      `${this.ApiURL}/updateTask/${id}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  deleteToDo(id: string): Observable<any> {
    return this.httpclient.delete<any>(`${this.ApiURL}/deleteTask/${id}`);
  }

  exportTasksToCSV(): Observable<Blob> {
    return this.httpclient.get(`${this.ApiURL}/exportTasks`, {
      responseType: 'blob',
    });
  }
}
