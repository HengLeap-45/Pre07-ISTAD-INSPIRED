
// Data 
const categories = [
  // { id, name, icon, projectCount }
];

// Functions 

function getAllCategories() {
  // return the full list of categories
}

function getCategoryById(id) {
  // find and return one category
}

function renderCategoryList(containerEl) {
  // render category pills/cards into the DOM
}

function filterProjectsByCategory(categoryId, projects) {
  // return subset of projects matching categoryId
}

function onCategorySelect(categoryId) {
  // handle click on a category -> trigger filtering + UI update
}

//Event bindings 
document.querySelectorAll('.category-item')?.forEach(el => {
  el.addEventListener('click', () => onCategorySelect(el.dataset.categoryId));
});

//Exports (if using ES modules)
export { getAllCategories, getCategoryById, filterProjectsByCategory };