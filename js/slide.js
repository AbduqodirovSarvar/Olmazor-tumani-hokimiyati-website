import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderSlide(Data){
    const slide = Data.slides[0];

    document.querySelector('.site-blocks-cover').style.backgroundImage =  `url(${baseFileUrl}/${slide.photo})`;

    const currentLanguage = getCurrentLanguage();

    document.querySelector('.site-blocks-cover h1').textContent = slide["name" + currentLanguage];
    document.querySelector('.site-blocks-cover .desc').textContent = slide["description" + currentLanguage];
}
