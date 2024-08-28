import { createAction, props } from '@ngrx/store';
import ToDo from './todo.model';

export const GetToDoAction = createAction('[ToDo] - Get ToDo');

export const SuccessGetToDoAction = createAction(
  '[ToDo] - Success Get ToDo',
  props<{ payload: ToDo[] }>()
);

export const CreateToDoAction = createAction(
  '[ToDo] - Create ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessCreateToDoAction = createAction(
  '[ToDo] - Success Create ToDo',
  props<{ payload: ToDo }>()
);

export const UpdateToDoAction = createAction(
  '[ToDo] - Update ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessUpdateToDoAction = createAction(
  '[ToDo] - Success Update ToDo',
  props<{ payload: ToDo }>()
);

export const DeleteToDoAction = createAction(
  '[ToDo] - Delete ToDo',
  props<{ id: string }>()
);

export const SuccessDeleteToDoAction = createAction(
  '[ToDo] - Success Delete ToDo',
  props<{ id: string }>()
);

export const ErrorToDoAction = createAction(
  '[ToDo] - Error',
  props<{ error: any }>()
);
