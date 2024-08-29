import {baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderAboutSection(Data) {
    let about = Data.about; 

    let currentLanguage = getCurrentLanguage();

    document.querySelector('#about-section .mb-4 p').textContent = about["description" + currentLanguage];
    document.querySelector('#about-section .mb-4').insertAdjacentHTML('beforeend', `<p><b>${about["receptionTime" + currentLanguage]}</b></p>`); // Adding reception time to the description
}
