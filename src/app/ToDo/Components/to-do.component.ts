import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import * as ToDoActions from '../todo.action';
import ToDo from '../todo.model';
import ToDoState from '../todo.state';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
})
export class ToDoComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<{ todos: ToDoState }>,
    private datePipe: DatePipe
  ) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit() {
    this.ToDoSubscription = this.todo$
      .pipe(
        map((x) => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.GetToDoAction());
  }

  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];

  Title: string = '';
  Description: string = '';
  DueDate: Date = new Date();
  Priority: 'low' | 'medium' | 'high' = 'low';
  Status: 'to-do' | 'in-progress' | 'completed' = 'to-do';
  IsCompleted: boolean = false;

  todoError: Error = null;

  createToDo() {
    const todo: ToDo = {
      title: this.Title,
      description: this.Description,
      dueDate: this.DueDate,
      priority: this.Priority,
      status: this.Status,
      isCompleted: this.IsCompleted,
      id: '',
    };
    this.store.dispatch(ToDoActions.CreateToDoAction({ payload: todo }));
    this.Title = '';
    this.Description = '';
    this.DueDate = new Date();
    this.Priority = 'low';
    this.Status = 'to-do';
    this.IsCompleted = false;
  }

  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') || '';
  }
}
