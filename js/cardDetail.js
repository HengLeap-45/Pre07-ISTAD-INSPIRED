
// State ----
let comments = [];
let helpfulCount = 0;
let notForMeCount = 0;
let isFollowing = false;

// DOM refs ----
const commentForm = document.querySelector('#commentForm');
const commentInput = document.querySelector('#commentInput');
const commentsList = document.querySelector('#commentsList');
const commentTemplate = document.querySelector('#commentTemplate');
const commentCountEl = document.querySelector('#commentCount');
const followBtn = document.querySelector('#followBtn');
const helpfulBtn = document.querySelector('#helpfulBtn');
const notForMeBtn = document.querySelector('#notForMeBtn');
const totalVotesEl = document.querySelector('#totalVotes');

// Functions ----

function loadCardDetail(projectId) {
  // fetch project details and populate the page
}

function addComment(text) {
  // create comment object, push to comments, render it
}

function renderComments() {
  // clone commentTemplate for each comment and append to commentsList
}

function updateCommentCount() {
  // update #commentCount text
}

function toggleFollow() {
  // toggle isFollowing, update #followBtn UI
}

function markHelpful() {
  // increment helpfulCount, update UI, recalc totalVotes
}

function markNotForMe() {
  // increment notForMeCount, update UI, recalc totalVotes
}

function updateVoteTotals() {
  // update #totalVotes based on helpfulCount + notForMeCount
}

//Event bindings
commentForm?.addEventListener('submit', (e) => { ... });
followBtn?.addEventListener('click', toggleFollow);
helpfulBtn?.addEventListener('click', markHelpful);
notForMeBtn?.addEventListener('click', markNotForMe);

//Init 
document.addEventListener('DOMContentLoaded', () => { ... });