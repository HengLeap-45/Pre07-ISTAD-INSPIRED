
// Data 
const generations = [
  // { id, name, year, members: [] }
];

// Functions 

function getAllGenerations() {
  // return full list of generations
}

function getGenerationById(id) {
  // find and return one generation
}

function renderGenerationList(containerEl) {
  // render generation options (e.g. dropdown or tab list) into the DOM
}

function filterProjectsByGeneration(generationId, projects) {
  // return subset of projects/members belonging to a generation
}

// Event bindings 
document.querySelectorAll('.generation-tab')?.forEach(el => {
  el.addEventListener('click', () => { ... });
});

// Exports (if using ES modules) 
export { getAllGenerations, getGenerationById, filterProjectsByGeneration };