// import { readdir } from 'fs';
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
        <img src="./images/${images[index]}" class="real-img" id="img-${images[index]}"/>
        <img src="./images/default/default.jpg" class="def-img" id="def-${images[index]}"/>

    </td>`
    if ((index + 1) % 3 === 0) {
      innerHtml += `</tr><tr>`;
    }
  }
  innerHtml += '</tr>';
  for (let index = 0; index < images.length; index++) {
    innerHtml += `<td class="table-cell">
        <img src="./images/${images[index]}" class="real-img" id="img-${images[index]}_d"/>
        <img src="./images/default/default.jpg" class="def-img" id="def-${images[index]}_d"/>

    </td>`
    if ((index + 1) % 3 === 0) {
      innerHtml += `</tr><tr>`;
    }
  }
  innerHtml += '</tr>';

  tableCtrl.innerHTML = innerHtml;
  document.dispatchEvent(buildEvent);
});

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("buildDone", () => {
    let isRealImgDisplayed = false;
    // console.log(e);
    function toggleImage(id) {
      var image = document.getElementById(id);
      if (image.style.display === 'none') {
        image.style.display = 'block';
      } else {
        image.style.display = 'none';
      }
    }
    let allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      //  console.log(img);
      img.addEventListener('click', imageClick);
    });
      const defImages = document.querySelectorAll('.def-img');
      const realImages = document.querySelectorAll('.real-img');
      defImages.forEach(i=>{
        i.style.display = 'block';
      })
      realImages.forEach(i=>{
        i.style.display = 'none';
      })
    function imageClick(element) {
      console.log(element.srcElement.id)
      toggleImage(element.srcElement.id);
      toggleImage(element.srcElement.id.replace('def', 'img'));

      setTimeout(() => {
        // console.log('Timeout finished');
        toggleImage(element.srcElement.id);
        toggleImage(element.srcElement.id.replace('def', 'img'));
      }, 1500);
    }


      //     // isRealImgDisplayed = !isRealImgDisplayed;
      //   };
      // images.forEach(img => {
      //   // console.log(img);
      //   const defImages = document.querySelectorAll('.def-img');
      //   const realImages = document.querySelectorAll('.real-img');
      //   defImages.forEach(i=>{
      //     i.style.display = 'block';
      //   })
      //   realImages.forEach(i=>{
      //     i.style.display = 'none';
      //   })
      //   let btnImg = document.getElementById(`img-${img}`);
      //   let defImg = document.getElementById(`def-${img}`);
      //   btnImg.addEventListener('click', imageClick);
      //   defImg.addEventListener('click', imageClick);
      //   function imageClick(element) {
      //     toggleImage(element.srcElement.id);
      //     toggleImage(element.srcElement.id.replace('def','img'));

      //     setTimeout(() => {
      //       // console.log('Timeout finished');
      //       toggleImage(element.srcElement.id);
      //       toggleImage(element.srcElement.id.replace('def','img'));
      //     }, 1500);


      //     // isRealImgDisplayed = !isRealImgDisplayed;
      //   };
      // },
      //   false
      // );
    });
});

