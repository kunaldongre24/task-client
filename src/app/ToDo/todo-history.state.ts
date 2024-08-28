import ToDoHistory from './todo-history.model';

export default class ToDoHistoryState {
  ToDoHistories: Array<ToDoHistory>;
  ToDoError: Error;
}

export const initializeHistoryState = (): ToDoHistoryState => {
  return { ToDoHistories: Array<ToDoHistory>(), ToDoError: null };
};
