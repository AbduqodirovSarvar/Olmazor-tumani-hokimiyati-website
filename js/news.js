import { baseFileUrl } from "./data.js";
import { getCurrentLanguage } from "./translation.js";

export function renderNewsSection(Data){
    let news = Data.posts.filter(post => post.category.id === 14);

    let currentLanguage = getCurrentLanguage();

    let newsSection = document.getElementById("blog-section");

    let row = document.getElementById("blog-section-news");
    let a = [1,2,3];

    news.forEach((element, index) => {
      if(index === 3){
        return;
      }

      let shortDescription = element["description" + currentLanguage].length > 100 
            ? element["description" + currentLanguage].substring(0, 100) + "..."
            : element["description" + currentLanguage];

      let createdAtDate = new Date(element.createdAt);
      let formattedDate = createdAtDate.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
      
      let newHTML = `
        <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
            <div class="h-entry">
              <a href="single.html">
                <img src="${baseFileUrl}/${element.photo}" alt="Image" class="img-fluid">
              </a>
              <h2 class="font-size-regular"><a href="#">${element["name" + currentLanguage]}</a></h2>
              <div class="meta mb-4">Olmazor tumani axborot xizmati <span class="mx-2">&bullet;</span>${formattedDate}<span class="mx-2">&bullet;</span></div>
              <p>${shortDescription}</p>
              <p><a href="#">Continue Reading...</a></p>
            </div> 
        </div>
        `;

        row.insertAdjacentHTML("beforeend", newHTML);
    });
}