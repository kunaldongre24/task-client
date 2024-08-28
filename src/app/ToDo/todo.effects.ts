import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ToDoActions from './todo.action';
import { ToDoHttpService } from './todo.httpservice';
import ToDo from './todo.model';

@Injectable()
export class ToDoEffects {
  constructor(private todoService: ToDoHttpService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.GetToDoAction),
      mergeMap(() =>
        this.todoService.getToDos().pipe(
          map((data: ToDo[]) => {
            return ToDoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error) => {
            return of(ToDoActions.ErrorToDoAction({ error }));
          })
        )
      )
    )
  );
  GetToDoHistory$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.GetHistoryAction),
      mergeMap((action) =>
        this.todoService.getToDoHistoryById(action.id).pipe(
          map(() => {
            return ToDoActions.SuccessGetHistoryAction({ id: action.id });
          }),
          catchError((error) => {
            return of(ToDoActions.ErrorToDoAction({ error }));
          })
        )
      )
    )
  );
  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.CreateToDoAction),
      mergeMap((action) =>
        this.todoService.createToDo(action.payload).pipe(
          map((data: ToDo) => {
            return ToDoActions.SuccessCreateToDoAction({ payload: data });
          }),
          catchError((error) => {
            return of(ToDoActions.ErrorToDoAction({ error }));
          })
        )
      )
    )
  );

  UpdateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.UpdateToDoAction),
      mergeMap((action) =>
        this.todoService.updateToDo(action.payload.id, action.payload).pipe(
          map((data: ToDo) => {
            return ToDoActions.SuccessUpdateToDoAction({ payload: data });
          }),
          catchError((error) => {
            return of(ToDoActions.ErrorToDoAction({ error }));
          })
        )
      )
    )
  );

  DeleteToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.DeleteToDoAction),
      mergeMap((action) =>
        this.todoService.deleteToDo(action.id).pipe(
          map(() => {
            return ToDoActions.SuccessDeleteToDoAction({ id: action.id });
          }),
          catchError((error) => {
            return of(ToDoActions.ErrorToDoAction({ error }));
          })
        )
      )
    )
  );
}
