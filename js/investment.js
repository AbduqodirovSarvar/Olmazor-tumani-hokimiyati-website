import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderInvestment(Data) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("single.html")) {
        return;
    }

    let investments = Data.posts.filter(post => post.category.id === 14);
    const currentLanguage = getCurrentLanguage();

    let investmentSection = document.getElementById("services-section");

    let button = document.createElement("div");
    button.className = "text-center";
    button.insertAdjacentHTML("beforeend", `<p><a href="single.html?PostCategoryId=${investments[0].category.id}" class="btn btn-primary mr-2 mb-2">Learn More</a></p>`);
    investmentSection.appendChild(button);

    let investmentRow = investmentSection.querySelector(".row.align-items-stretch");

    investments.forEach((investment, index) => {
        if (index === 4) {
            return;
        }

        let shortDescription = investment["description" + currentLanguage];
        shortDescription = shortDescription.length > 100 
            ? shortDescription.substring(0, 100) + "..."
            : shortDescription;

        // Replace new lines with <br> tags
        shortDescription = shortDescription.replace(/\\n/g, '<br>').replace(/\\"/g, '"');

        let investmentHTML = `
        <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
            <div class="unit-4">
                <img class="img-fluid" src="${baseFileUrl}/${investment.photo}" alt="img">
                <div>
                    <h3>${investment.nameEn.replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</h3>
                    <p>${shortDescription}</p>
                    <p><a href="single.html?PostId=${investment.id}">Learn More</a></p>
                </div>
            </div>
        </div>
        `;

        investmentRow.insertAdjacentHTML('beforeend', investmentHTML);
    });
}
