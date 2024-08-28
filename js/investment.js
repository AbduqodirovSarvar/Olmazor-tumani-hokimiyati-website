import { baseFileUrl } from './data.js';

export function renderInvestment(Data){
    let investments = Data.posts.filter(post => post.category.id === 14);

    let investmentSection = document.getElementById("services-section");

    let investmentRow = investmentSection.querySelector(".row.align-items-stretch");

    investments.forEach((investment, index) => {
        let investmentHTML = `
        <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
            <div class="unit-4">
              <img class="img-fluid" src="${baseFileUrl}/${investment.photo}" alt="img">
              <div>
                <h3>${investment.nameEn}</h3>
                <p>${investment.descriptionEn}</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
        `;

        investmentRow.insertAdjacentHTML('beforeend', investmentHTML);
    });
}