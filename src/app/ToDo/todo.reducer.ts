import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from './todo.action';
import ToDoState, { initializeState } from './todo.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,

  on(ToDoActions.GetToDoAction, (state) => state),

  on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload, ToDoError: null };
  }),

  on(ToDoActions.CreateToDoAction, (state: ToDoState) => state),

  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),

  on(ToDoActions.UpdateToDoAction, (state: ToDoState) => state),

  on(ToDoActions.SuccessUpdateToDoAction, (state: ToDoState, { payload }) => {
    const updatedToDos = state.ToDos.map((todo) =>
      todo.id === payload.id ? payload : todo
    );
    return { ...state, ToDos: updatedToDos, ToDoError: null };
  }),

  on(ToDoActions.DeleteToDoAction, (state: ToDoState) => state),

  on(ToDoActions.SuccessDeleteToDoAction, (state: ToDoState, { id }) => {
    const filteredToDos = state.ToDos.filter((todo) => todo.id !== id);
    return { ...state, ToDos: filteredToDos, ToDoError: null };
  }),

  on(ToDoActions.ErrorToDoAction, (state: ToDoState, { error }) => {
    console.error('ToDo Error:', error);
    return { ...state, ToDoError: error };
  })
);

export function ToDoReducer(
  state: ToDoState | undefined,
  action: Action
): ToDoState {
  return reducer(state, action);
}
