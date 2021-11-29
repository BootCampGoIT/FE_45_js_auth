import { deleteTask } from '../api/api';
import { store } from '../data';
import { createPaginationMarkup, getTasksSlice } from './paginationTasks';

const refs = {
  taskList: document.querySelector('.taskList'),
};

const createTask = task =>
  `<li class="taskItem" data-id=${task.id}>
    <h2 class="taskName">Name: ${task.title}</h2>
    <p>Description: ${task.desc}</p>
    <button type="button" data-button="itemDeleteButton" class="itemDeleteButton">Delete</button>
  </li>`;

export const createTaskList = list => {
  const markup = list.reduce((acc, task) => {
    acc += createTask(task);
    return acc;
  }, '');
  refs.taskList.innerHTML = markup;
};

const deleteTaskItem = e => {
  if (e.target.dataset) {
    if (e.target.dataset.button === 'itemDeleteButton') {
      const id = e.target.closest('[data-id]').dataset.id;
      deleteTask(id).then(() => {
        store.tasks = store.tasks.filter(task => task.id !== id);
        getTasksSlice();
        createPaginationMarkup();
      });
    }
  }
};

refs.taskList.addEventListener('click', deleteTaskItem);
