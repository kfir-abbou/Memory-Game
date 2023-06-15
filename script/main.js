import ImagesCompareStack from "./imagesCompareStack.js";

// import { readdir } from 'fs';
const imageStack = new ImagesCompareStack(2);
let isStackFull = false;
const buildEvent = new Event("buildDone");
// const imagesDirectory = '../html/images';
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
        toggleDisplayClass(a);
        toggleDisplayClass(b);
        toggleDisplayClass(a.replace('def', 'img'));
        toggleDisplayClass(b.replace('def', 'img'));
        addImageClickListener(allImageInDoc);

      }, 1500);
    }
  }
});

function addImageClickListener(images) {
  images.forEach(img => {
    img.addEventListener('click', imageClick);
  });
}
 

function imageClick(element) {
  imageStack.push(element.srcElement.id);
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("buildDone", () => {
    // console.log(e);
    let allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      img.addEventListener('click', imageClick);
    });
  });
});


 async function toggleDisplayClass(controlId){
  let element = document.getElementById(controlId);
  // fadeout(element);
  // element.classList.toggle('hidden');
  // setInterval(hide(element), 100);
  element.classList.toggle('hidden');
//  if (element.classList.contains('hidden')) {
//    await fadeIn(element);
//  }
//  else{
//   await fadeout(element);
//  } 
 
}
async function fadeIn(element){
  let   intervalID = setInterval(function(){
    show(element, intervalID);
  }, 100);
}
 
async function fadeout(element){
  let   intervalID = setInterval(function(){
    hide(element, intervalID);
  }, 100);
}
 
function hide(element, intervalID){
    let opacity = Number(window.getComputedStyle(element).getPropertyValue("opacity"))
      
    if(opacity > 0){
      opacity -=   0.5;
      element.style.opacity = opacity;
      // console.log(opacity + '  -  ' + element.id);
    }
    else{
      clearInterval(intervalID);
      console.log(intervalID)
    }
}

function show(element, intervalID){
  let opacity = Number(window.getComputedStyle(element).getPropertyValue("opacity"))
    
  if(opacity > 100){
    opacity +=   0.5;
    element.style.opacity = opacity;
    // console.log(opacity + '  -  ' + element.id);
  }
  else{
    clearInterval(intervalID);
    console.log(intervalID)
  }
}
