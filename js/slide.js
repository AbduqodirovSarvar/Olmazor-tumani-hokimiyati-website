import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderSlide(Data){
    const currentPath = window.location.pathname;
    if(currentPath.includes("single.html")){
        return;
    }
    const slide = Data.slides[0];

    document.querySelector('.site-blocks-cover').style.backgroundImage =  `url(${baseFileUrl}/${slide.photo})`;

    const currentLanguage = getCurrentLanguage();

    document.querySelector('#about-section .mb-4').insertAdjacentHTML('beforeend', `<p>${slide["description" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</p>`);

    document.querySelector('.site-blocks-cover h1').textContent = slide["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"');
    // document.querySelector('.site-blocks-cover .desc').textContent = slide["description" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"');
}
