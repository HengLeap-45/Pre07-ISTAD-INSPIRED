
// Data 
let reviews = [
  // { id, projectId, userId, rating, text, createdAt }
];

//Functions 

function getReviewsForProject(projectId) {
  // return reviews belonging to a specific project
}

function addReview(projectId, userId, rating, text) {
  // validate + create a new review
}

function getAverageRating(projectId) {
  // compute average star rating for a project
}

function renderReviewList(projectId, containerEl) {
  // render review cards into the DOM
}

function renderStarRatingInput(containerEl) {
  // render an interactive star-rating widget
}

// Event bindings 
reviewForm?.addEventListener('submit', (e) => { ... });

//Exports (if using ES modules) 
export { getReviewsForProject, addReview, getAverageRating };