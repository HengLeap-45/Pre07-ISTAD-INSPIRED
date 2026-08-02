

// Functions 

function previewImage(fileInputEl, previewImgEl) {
  // read selected file and show a live preview
}

function validateImageFile(file) {
  // check file type / size before accepting an upload
}

function uploadImage(file) {
  // send file to server/storage, return URL
}

function setAvatar(imageUrl) {
  // update the user's avatar across the UI
}

function lazyLoadImages(selector = 'img[data-src]') {
  // swap data-src -> src when image enters viewport
}

//  Event bindings 
 document.querySelectorAll('input[type="file"]')?.forEach(input => {
   input.addEventListener('change', (e) => { ... });
 });

//  Exports (if using ES modules) 
 export { previewImage, validateImageFile, uploadImage, setAvatar };