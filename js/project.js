import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderProjectSection(Data) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("single.html")) {
        return;
    }
    
    const projects = Data.posts.filter(post => post.category.id === 8);
    
    if (projects.length === 0) {
        // If no posts are found for the category, do not render the section
        return;
    }

    let currentLanguage = getCurrentLanguage();

    const projectSection = document.getElementById("site-section");

    const buttonDiv = document.createElement('div');
    buttonDiv.className = "text-center";
    
    buttonDiv.insertAdjacentHTML("beforeend", `<p><a href="single.html?PostCategoryId=${projects[0].category.id}" class="btn btn-primary mr-2 mb-2" data-i18n="button.learn_more">Learn More</a></p>`);

    projectSection.appendChild(buttonDiv);

    const row = document.getElementById("site-section-row");

    let imgElement = row.querySelector(".owl-carousel.slide-one-item-alt");
    let textElement = row.querySelector(".owl-carousel.slide-one-item-alt-text");
    
    projects.forEach((project, index) => {
        // Handle image
        let projectImgHTML = `
            <img src="${baseFileUrl}/${project.photo}" alt="Image" class="img-fluid">
        `;
        imgElement.insertAdjacentHTML('beforeend', projectImgHTML);

        // Handle description and name to replace \n with <br>
        let shortDescription = project["description" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"');
        shortDescription = shortDescription.length > 150 
            ? shortDescription.substring(0, 150) + "..."
            : shortDescription;

        let name = project["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"');

        // Handle text
        let projectTextHTML = `
            <div>
                <h2 class="section-title mb-3">${name}</h2>
                <p>${shortDescription}</p>
                <p><a href="single.html?PostId=${project.id}" data-i18n="button.read_more">Learn More</a></p>
            </div>
        `;
        textElement.insertAdjacentHTML('beforeend', projectTextHTML);
    });    
}
