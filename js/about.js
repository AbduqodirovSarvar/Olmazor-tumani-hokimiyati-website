import {baseFileUrl } from './data.js';

export function renderAboutSection(Data) {
    let about = Data.about; // Assuming Data has been initialized and contains the 'about' property

    // Set the current language
    let currentLanguage = 'En'; // Change this to dynamically get the user's preferred language (e.g., 'Uz', 'Ru', 'UzRu', 'Kaa')

    // Dynamically access the properties based on the current language
    let locationName = about.location["name" + currentLanguage];
    let description = about["description" + currentLanguage];
    let receptionTime = about["receptionTime" + currentLanguage];

    // Update the HTML content
    // document.querySelector('#about-section .section-title').textContent = locationName; 
    // document.querySelector('#about-section .h3').textContent = locationName // This can be dynamic if needed
    document.querySelector('#about-section .mb-4 p').textContent = description;
    document.querySelector('#about-section .mb-4').insertAdjacentHTML('beforeend', `<p><b>${receptionTime}</b></p>`); // Adding reception time to the description
}
