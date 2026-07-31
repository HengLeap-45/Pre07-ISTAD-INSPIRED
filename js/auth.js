
// State 
let currentUser = null;

// DOM refs 
const signUpForm = document.querySelector('#signUpForm');
const loginForm = document.querySelector('#loginForm');

// Functions 

function signUp(fullname, email, password) {
  // validate inputs
  // create user object
  // save to storage / send to API
}

function login(email, password) {
  // validate credentials
  // set currentUser / session token
}

function logout() {
  // clear currentUser / session token
}

function getCurrentUser() {
  // return currently logged-in user, or null
}

function isAuthenticated() {
  // return true/false
}

function validateEmail(email) {
  // basic email format check
}

function validatePassword(password) {
  // basic password strength check
}
// Event bindings 
signUpForm?.addEventListener('submit', (e) => { ... });
loginForm?.addEventListener('submit', (e) => { ... });

// Exports (if using ES modules) 
export { signUp, login, logout, getCurrentUser, isAuthenticated };