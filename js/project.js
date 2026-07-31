

// Data 
let projects = [
  // { id, title, description, image, category, generation, techStack: [], author, createdAt }
];

//Functions 

function getAllProjects() {
  // return full list of projects
}

function getProjectById(id) {
  // find and return one project
}

function createProject(projectData) {
  // validate + add a new project (used by post-project.html)
}

function searchProjects(query) {
  // filter projects by title/description match
}

function renderProjectCards(projectsList, containerEl) {
  // render project cards into the DOM (used by all.html / projectpage.html)
}

function toggleFavorite(projectId) {
  // add/remove project from favorites (used by favorite page.html)
}

function getFavorites() {
  // return list of favorited projects
}

function getUserHistory(userId) {
  // return viewing/activity history (used by history-page.html)
}

// Init 
document.addEventListener('DOMContentLoaded', () => { ... });

//Exports (if using ES modules) 
export { getAllProjects, getProjectById, createProject, searchProjects, toggleFavorite };
