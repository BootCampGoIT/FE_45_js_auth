import { store } from '../data';
import { refs } from '../refs/refs';
import { createTaskList } from './tasksList';

// Возвращает кол-во страниц
const getPagesCount = () => {
  return Math.ceil(store.tasks.length / store.perPage);
};

// Создает и добавляет разметку кнопок пагинации
export const createPaginationMarkup = () => {
  let markup = '';
  for (let i = 1; i <= getPagesCount(); i += 1) {
    markup += `
    <li class="pagItem">
      <button class="pagItemButton" type="button" data-pagenumber="${i}">${i}</button>
    </li>`;
  }

  const withNavigationButtons = `
  <li class="pagItem">
    <button class="pagItemButton" type="button" data-page="prev">&#60;</button>
  </li>
  ${markup}
  <li class="pagItem">
    <button class="pagItemButton" type="button" data-page="next">&#62;</button>
  </li>`;
  refs.pagList.innerHTML = withNavigationButtons;
};

// Выбирает и добавляет из исходного массива элементы текущей страницы
export const getTasksSlice = (pageNumber = 1) => {
  const start = (pageNumber - 1) * store.perPage;
  const end = start + store.perPage;
  const tasks = store.tasks.slice(start, end);
  createTaskList(tasks);
};

const setDisabledButton = target => {
  const currentElement = refs.pagList.querySelector('.pagItemActive');
  const currentPage = Number(currentElement.dataset.pagenumber);

  if (target.nodeName === 'BUTTON' && target.dataset.page === 'prev') {
    getTasksSlice(currentPage - 1);
    setActive(currentPage - 1);
  }
  if (target.nodeName === 'BUTTON' && target.dataset.page === 'next') {
    getTasksSlice(currentPage + 1);
    setActive(currentPage + 1);
  }
};

// При клике на кнопку пагинации вызывает функцию getTasksSlice для выбраной страницы
const getPageTasks = e => {
  setDisabledButton(e.target);
  if (e.target.nodeName !== 'BUTTON' || !e.target.dataset.pagenumber) return;
  const pageNumber = Number(e.target.dataset.pagenumber);
  getTasksSlice(pageNumber);
  setActive(pageNumber);
};

// Добавляет слушатель на список с элементами пагинации
export const setPaginationListener = () => {
  refs.pagList.addEventListener('click', getPageTasks);
};

export const setActive = id => {
  console.log('setActive');
  console.log('id :>> ', id);
  const prev = refs.pagList.querySelector('[data-page="prev"]');
  const next = refs.pagList.querySelector('[data-page="next"]');
  const prevActiveElement = refs.pagList.querySelector('.pagItemActive');
  if (prevActiveElement) {
    prevActiveElement.classList.toggle('pagItemActive');
  }
  const currentActiveElement = refs.pagList.querySelector(`[data-pagenumber='${id}']`);
  currentActiveElement.classList.toggle('pagItemActive');
  if (id === 1) {
    prev.disabled = true;
  } else prev.disabled = false;
  if (id === getPagesCount()) {
    next.disabled = true;
  } else next.disabled = false;
};
