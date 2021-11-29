import { getTasks } from './api/api';
import { createTaskList } from './tasks/tasksList';
import './tasks/tasksForm';
import { store } from './data';
import {
  createPaginationMarkup,
  getTasksSlice,
  setActive,
  setPaginationListener,
} from './tasks/paginationTasks';
import { refs } from './refs/refs';

//выполняет запрос на сервер и получает таски.
getTasks().then(() => {
  getTasksSlice();
  createPaginationMarkup();
  setActive(1);
  setPaginationListener();
});

export const createMainMarkup = markup => {
  refs.main.innerHTML = markup;
};
