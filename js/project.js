import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderProjectSection(Data) {
    const currentPath = window.location.pathname;
    if(currentPath.includes("single.html")){
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
    
    buttonDiv.insertAdjacentHTML("beforeend", `<p><a href="single.html?PostCategoryId=${projects[0].category.id}" class="btn btn-primary mr-2 mb-2">Learn More</a></p>`);

    projectSection.appendChild(buttonDiv);

    const row = document.getElementById("site-section-row");

    let imgElement = row.querySelector(".owl-carousel.slide-one-item-alt");

    let textElement = row.querySelector(".owl-carousel.slide-one-item-alt-text");
    
    projects.forEach((project, index) => {
        let projectImgHTML = `
            <img src="${baseFileUrl}/${project.photo}" alt="Image" class="img-fluid">
        `;

        imgElement.insertAdjacentHTML('beforeend', projectImgHTML);

        let shortDescription = project["description"+currentLanguage].length > 150 
            ? project["description"+currentLanguage].substring(0, 150) + "..."
            : project["description"+currentLanguage];

        let projectTextHTML = `
            <div>
                <h2 class="section-title mb-3">${project["name"+currentLanguage]}</h2>
                <p>${shortDescription}</p>
                <p><a href="single.html?PostId=${project.id}">Learn More</a></p>
            </div>
        `;

        textElement.insertAdjacentHTML('beforeend', projectTextHTML);
    });    
}