
//Data
const techStacks = [
  // { id, name, icon }
];

//Functions 

function getAllTechStacks() {
  // return full list of tech stack tags
}

function getTechStackById(id) {
  // find and return one tech stack tag
}

function renderTechStackBadges(techStackIds, containerEl) {
  // render small icon/badge list for a project's tech stack
}

function filterProjectsByTechStack(techStackId, projects) {
  // return subset of projects using a given tech stack
}

//Exports (if using ES modules) 
export { getAllTechStacks, getTechStackById, filterProjectsByTechStack };