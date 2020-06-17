export function isAuthenticated() {
  return !!getToken();
}

export function authenticate(username, password) {
  if (username && password) setToken('token');
}

function getToken() {
  return localStorage.getItem('token');
}

function setToken(value) {
  localStorage.setItem('token', value);
}
