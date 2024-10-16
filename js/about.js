import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderAboutSection(Data) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("single.html")) {
        return;
    }
    let about = Data.about; 

    let currentLanguage = getCurrentLanguage();

    // Set description with <br> tags
    // document.querySelector('#about-section .mb-4 p').innerHTML = about["description" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"');
    
    // Add reception time with <br> tags
    document.querySelector('#about-section .mb-4').insertAdjacentHTML('beforeend', `<b><p data-i18n="reception_date">Lorem ipsum dolor sit</p></b>`);
    document.querySelector('#about-section .mb-4').insertAdjacentHTML('beforeend', `<p>${about["receptionTime" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</p>`);
}
