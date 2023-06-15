import ImagesCompareStack from "./imagesCompareStack.js";

// import { readdir } from 'fs';
const imageStack = new ImagesCompareStack(2);
let isStackFull = false;
const buildEvent = new Event("buildDone");
const imagesDirectory = '../html/images';
const images = [
  'image-1.jpeg',
  'image-2.jpeg',
  'image-3.jpeg',
  'image-4.jpeg',
  'image-5.jpeg',
  'image-6.jpeg',
];

window.addEventListener("load", () => {

  let tableCtrl = document.querySelector('#image-table');
  let innerHtml = `<tr>`;

  for (let index = 0; index < images.length; index++) {
    innerHtml += `<td class="table-cell">
        <img src="./images/${images[index]}" class="real-img hidden" id="img-${images[index]}"/>
        <img src="./images/default/default.jpg" class="def-img" id="def-${images[index]}"/>
    </td>`
    if ((index + 1) % 6 === 0) {
      innerHtml += `</tr><tr>`;
    }
  }
  innerHtml += '</tr>';
  for (let index = 0; index < images.length; index++) {
    innerHtml += `<td class="table-cell">
        <img src="./images/${images[index]}" class="real-img hidden" id="img-${images[index]}_d"/>
        <img src="./images/default/default.jpg" class="def-img" id="def-${images[index]}_d"/>

    </td>`
    if ((index + 1) % 6 === 0) {
      innerHtml += `</tr><tr>`;
    }
  }
  innerHtml += '</tr>';

  tableCtrl.innerHTML = innerHtml;
  document.dispatchEvent(buildEvent);
});

document.addEventListener('stackUpdate', (event) => {
  // console.log(event);
  const { id, currSize } = event.detail;
  toggleDisplayClass('kfir');
  toggleDisplayClass(id);
  toggleDisplayClass(id.replace('def', 'img'));
  isStackFull = imageStack.isFull();
  if (isStackFull && currSize <= 2) {
    let allImageInDoc = document.querySelectorAll('img');

    allImageInDoc.forEach(img=>{
      img.removeEventListener('click', imageClick);
    });

    let a = imageStack.pop();
    let b = imageStack.pop();

    if (a.replace('_d', '') === b.replace('_d', '')) {
      addImageClickListener(allImageInDoc);
    }
    else {
      setTimeout(() => {

        // toggleImage(a);
        // toggleImage(b);
        // toggleImage(a.replace('def', 'img'));
        // toggleImage(b.replace('def', 'img'));
        toggleDisplayClass(a);
        toggleDisplayClass(b);
        toggleDisplayClass(a.replace('def', 'img'));
        toggleDisplayClass(b.replace('def', 'img'));
        addImageClickListener(allImageInDoc);

      }, 1500);
    }
  }
  // else{
  //   let imageName = img.detail;
  //   toggleImage(imageName);
  //   toggleImage(imageName.replace('def', 'img'));
  // }
});

function addImageClickListener(images) {
  images.forEach(img => {
    img.addEventListener('click', imageClick);
  });
}

// function disableImageClick(event) {
//   event.preventDefault();
//   event.stopPropagation();  
// }

function imageClick(element) {
  let pushed = imageStack.push(element.srcElement.id);
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("buildDone", () => {
    // console.log(e);
    let allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      img.addEventListener('click', imageClick);
    });
    const defImages = document.querySelectorAll('.def-img');
    const realImages = document.querySelectorAll('.real-img');
    // defImages.forEach(i => {
    //   i.style.display = 'block';
    // });
    // realImages.forEach(i => {
    //   i.style.display = 'none';
    // });
  });
});

function toggleImage(id) {
  let image = document.getElementById(id);
  if (image.style.display === 'none') {
    image.style.display = 'block';
  }
  else {
    image.style.display = 'none';
  }
}

function toggleDisplayClass(controlId){
  let element = document.getElementById(controlId);
  let kfir = document.getElementById('kfir');
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
    console.log('removed for ' + controlId);
  }
  else{
    element.classList.add('hidden');
    console.log('added for ' + controlId);

  }
  // element.classList.toggle('show');  
  
}
