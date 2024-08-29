import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from "./translation.js";

export function renderInvestment(Data){
    let investments = Data.posts.filter(post => post.category.id === 14);

    const currentLanguage = getCurrentLanguage();

    let investmentSection = document.getElementById("services-section");

    let investmentRow = investmentSection.querySelector(".row.align-items-stretch");

    investments.forEach((investment, index) => {
      if(index === 4){
        return;
      }
      let shortDescription = investment["description" + currentLanguage].length > 100 
            ? investment["description" + currentLanguage].substring(0, 100) + "..."
            : investment["description" + currentLanguage];

        let investmentHTML = `
        <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
            <div class="unit-4">
              <img class="img-fluid" src="${baseFileUrl}/${investment.photo}" alt="img">
              <div>
                <h3>${investment.nameEn}</h3>
                <p>${shortDescription}</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
        `;

        investmentRow.insertAdjacentHTML('beforeend', investmentHTML);
    });
}