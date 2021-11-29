import { store } from '../data';

const BASE_URL = 'https://newpro-4f2f6-default-rtdb.firebaseio.com';

export const postTask = task => {
  return fetch(BASE_URL + '/tasks.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data => (store.tasks = [{ id: data.name, ...task }, ...store.tasks]));
};

export const getTasks = () => {
  return fetch(BASE_URL + '/tasks.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        const keys = Object.keys(data);
        const tasks = keys.map(key => ({ id: key, ...data[key] })).reverse();
        store.tasks = tasks;
      }
    });
};

export const deleteTask = id => {
  return fetch(BASE_URL + `/tasks/${id}.json`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Error');
    }
  });
};
