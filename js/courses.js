
//Data
const courses = [
  // { id, title, description, image, lessons: [] }
];

//Functions 

function getAllCourses() {
  // return full list of courses
}

function getCourseById(id) {
  // find and return one course
}

function renderCourseCards(containerEl) {
  // render course cards into the DOM
}

function renderCourseDetail(courseId, containerEl) {
  // render a single course's detail view (used on html.html / css.html / js.html)
}

//Init 
document.addEventListener('DOMContentLoaded', () => { ... });

//Exports (if using ES modules) 
export { getAllCourses, getCourseById, renderCourseCards };