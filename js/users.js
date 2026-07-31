
// Data 
let users = [
  // { id, fullname, email, avatar, bio, joinedAt }
];

// Functions

function getUserById(id) {
  // find and return one user
}

function updateProfile(userId, updates) {
  // update fullname/email/bio/avatar (used by persinal-info.html)
}

function renderProfile(userId, containerEl) {
  // render profile info into the DOM
}

function getUserProjects(userId) {
  // return list of projects created by this user
}

function getUserActivityHistory(userId) {
  // return account activity/history (used by useracchistory.html)
}

//Init
document.addEventListener('DOMContentLoaded', () => { ... });

// Exports (if using ES modules) 
export { getUserById, updateProfile, renderProfile, getUserProjects };