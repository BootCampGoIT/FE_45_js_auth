import { postTask } from '../api/api';
import { store } from '../data';
import { createPaginationMarkup, getTasksSlice } from './paginationTasks';
import { createTaskList } from './tasksList';

const refs = {
  taskForm: document.forms.taskForm,
};

const data = {
  task: {
    title: '',
    desc: '',
  },
};

const addTask = e => {
  e.preventDefault();
  postTask(data.task).then(() => {
    getTasksSlice();
    createPaginationMarkup()

    data.task.title = '';
    data.task.desc = '';
    refs.taskForm.reset();
  });
};

const onHandleChange = e => {
  const { name, value } = e.target;
  data.task[name] = value;
};

refs.taskForm.addEventListener('input', onHandleChange);
refs.taskForm.addEventListener('submit', addTask);

export default refs;
