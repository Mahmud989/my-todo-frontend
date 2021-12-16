import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, of, tap} from "rxjs";
import {TodoModel} from "../models/todoModels";


@Injectable({
  providedIn: 'root'
})
export class TodoClientService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTodos(): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(environment.SERVICE.ALL_TODOs).pipe(
      // tap(employees => console.log(JSON.stringify(employees))),
      catchError(this.handleError<TodoModel[]>([]))
    )
  }

  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      return of(result);
    };
  }

  createTodo(todo: string): Observable<TodoModel> {
    let body = {
      content: todo
    }
    return this.httpClient.post<TodoModel>(environment.SERVICE.CREATE_TODO, body);
  }

}
