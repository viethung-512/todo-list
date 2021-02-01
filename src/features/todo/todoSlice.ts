import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { Task } from '../../app/types/task';

interface TodoState {
  listTask: Task[];
  selected: string[];
}

type CreateTaskArgs = Omit<Task, 'id'>;
type UpdateTaskArgs = {
  id: string;
  data: Partial<Omit<Task, 'id'>>;
};
type ToggleSelectTask = { id: string; type: 'select' | 'unselect' };
type DeleteTaskArgs = { id: string };
type DeleteTasksArgs = { ids: string[] };
type SearchTaskArgs = { searchTerm: string };

const getListTasksFromLocalStorage = (): Task[] => {
  let listTask: Task[] = [];
  if (
    localStorage.getItem('todoList') &&
    typeof localStorage.getItem('todoList') === 'string'
  ) {
    listTask = JSON.parse(localStorage.getItem('todoList')!);
  }

  listTask = listTask.sort((a, b) => {
    // @ts-ignore
    return new Date(b.dueDate) - new Date(a.dueDate);
  });

  return listTask;
};

const initialState: TodoState = {
  listTask: getListTasksFromLocalStorage(),
  selected: [],
};

const authSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<CreateTaskArgs>) => {
      const taskId = uuid();
      const newTask: Task = {
        id: taskId,
        title: action.payload.title,
        descriptions: action.payload.descriptions,
        dueDate: action.payload.dueDate,
        priority: action.payload.priority,
      };

      const tasks = getListTasksFromLocalStorage();
      tasks.push(newTask);
      localStorage.setItem('todoList', JSON.stringify(tasks));

      state.listTask = tasks;
    },
    updateTask: (state, action: PayloadAction<UpdateTaskArgs>) => {
      const tasks = getListTasksFromLocalStorage();
      const newTasks = tasks.map(task => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            ...action.payload.data,
          };
        }

        return task;
      });

      localStorage.setItem('todoList', JSON.stringify(newTasks));
      state.listTask = newTasks;
    },
    toggleSelectTask: (state, action: PayloadAction<ToggleSelectTask>) => {
      if (action.payload.type === 'select') {
        state.selected.push(action.payload.id);
      } else {
        state.selected = state.selected.filter(
          sl => sl.toString() !== action.payload.id
        );
      }
    },
    deleteTask: (state, action: PayloadAction<DeleteTaskArgs>) => {
      const tasks = getListTasksFromLocalStorage();
      const newTasks = tasks.filter(task => task.id !== action.payload.id);

      localStorage.setItem('todoList', JSON.stringify(newTasks));
      state.listTask = newTasks;
    },
    deleteTasks: (state, action: PayloadAction<DeleteTasksArgs>) => {
      const tasks = getListTasksFromLocalStorage();
      const newTasks = tasks.filter(
        task => !action.payload.ids.includes(task.id)
      );

      localStorage.setItem('todoList', JSON.stringify(newTasks));
      state.listTask = newTasks;
      state.selected = [];
    },
    searchTask: (state, action: PayloadAction<SearchTaskArgs>) => {
      const tasks = getListTasksFromLocalStorage();
      state.listTask = tasks.filter(
        task =>
          task.title.includes(action.payload.searchTerm) ||
          task.descriptions?.includes(action.payload.searchTerm)
      );
    },
  },
});

export const {
  createTask,
  updateTask,
  toggleSelectTask,
  deleteTask,
  deleteTasks,
  searchTask,
} = authSlice.actions;
export default authSlice.reducer;
