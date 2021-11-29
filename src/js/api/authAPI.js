import axios from 'axios';

const API_KEY = 'AIzaSyATsyVFWbNzXkqv2AaiP6kTfQxQFZJFhL4';
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const signUp = user => {
  axios
    .post(signUpURL, { ...user, returnSecureToken: true, displayName: user.email })
    .then(({ data }) => {
      localStorage.setItem('auth', JSON.stringify(data.idToken));
      console.log(data);
    });
};

const signIn = user => {
  axios.post(signInURL, { ...user, returnSecureToken: true }).then(({ data }) => {
    localStorage.setItem('auth', JSON.stringify(data.idToken));
    console.log(data);
  });
};

export { signUp, signIn };
