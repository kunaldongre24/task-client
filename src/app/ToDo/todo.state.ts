import ToDo from './todo.model';
import ToDoHistory from './todo-history.model';

export default interface ToDoState {
  ToDos: ToDo[];
  ToDoError: Error | null;
  taskHistory: ToDoHistory[];
  loadingHistory: boolean;
  historyError: Error | null;
}

// Initialize state
export function initializeState(): ToDoState {
  return {
    ToDos: [],
    ToDoError: null,
    taskHistory: [],
    loadingHistory: false,
    historyError: null,
  };
}
