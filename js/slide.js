import { baseFileUrl } from './data.js';

export function renderSlide(Data){
    const slide = Data.slides[0];

    document.querySelector('.site-blocks-cover').style.backgroundImage =  `url(${baseFileUrl}/${slide.photo})`;

    const currentLanguage = 'En';

    let slideName = slide["name" + currentLanguage];
    let slideDescription = slide["description" + currentLanguage];

    document.querySelector('.site-blocks-cover h1').textContent = slideName;
    document.querySelector('.site-blocks-cover .desc').textContent = slideDescription;
}
