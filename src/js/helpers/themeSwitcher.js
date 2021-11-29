import { refs } from '../refs/refs';

export const useThemeSwitcher = () => {
  return {
    theme: JSON.parse(localStorage.getItem('theme')) || 'light',
    persistTheme() {
      if (!JSON.parse(localStorage.getItem('theme'))) {
        localStorage.setItem('theme', JSON.stringify(this.theme));
      }
      if (this.theme === 'dark') {
        refs.main.style.backgroundColor = 'black';
      } else if (this.theme === 'light') {
        refs.main.style.backgroundColor = 'lightgray';
      }
    },
    setTheme() {
      if (this.theme === 'dark') {
        refs.main.style.backgroundColor = 'lightgray';
        localStorage.setItem('theme', JSON.stringify('light'));
        this.theme = 'light';
      } else {
        refs.main.style.backgroundColor = 'black';
        localStorage.setItem('theme', JSON.stringify('dark'));
        this.theme = 'dark';
      }
    },
    isDarkTheme() {
      return this.theme === 'dark';
    },
  };
};

// =================== old ============================

// export const persistTheme = () => {
//   const currentTheme = JSON.parse(localStorage.getItem('theme'));
//   if (currentTheme) {
//     if (currentTheme === 'dark') {
//       refs.main.style.backgroundColor = 'black';
//     } else if (currentTheme === 'light') {
//       refs.main.style.backgroundColor = 'lightgray';
//     }
//   } else {
//     localStorage.setItem('theme', JSON.stringify('light'));
//   }
// };

// export const setTheme = () => {
//   const currentTheme = JSON.parse(localStorage.getItem('theme'));
//   if (currentTheme === 'dark') {
//     refs.main.style.backgroundColor = 'lightgray';
//     localStorage.setItem('theme', JSON.stringify('light'));
//   } else {
//     refs.main.style.backgroundColor = 'black';
//     localStorage.setItem('theme', JSON.stringify('dark'));
//   }
// };

// export const isDarkTheme = () => {
//   const currentTheme = JSON.parse(localStorage.getItem('theme'));
//   return currentTheme === 'dark';
// };
