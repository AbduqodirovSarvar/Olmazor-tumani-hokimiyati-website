import { baseFileUrl } from "./data.js";
import { getCurrentLanguage } from "./translation.js";

export function renderNewsSection(Data) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("single.html")) {
        return;
    }

    // Filter posts that have a category and match the category ID
    let news = Data.posts.filter(post => post.category && post.category.id === 6);

    let currentLanguage = getCurrentLanguage();
    const newsSection = document.getElementById("blog-section");

    if (news.length > 0) {
        let button = document.createElement("div");
        button.className = "text-center";
        button.insertAdjacentHTML("beforeend", `<p><a href="single.html?PostCategoryId=${news[0].category.id}" class="btn btn-primary mr-2 mb-2" data-i18n="button.learn_more">Learn More</a></p>`);
        newsSection.appendChild(button);
    }

    let row = document.getElementById("blog-section-news");

    for (let index = 0; index < news.length; index++) {
        if (index === 6) {
            break; // exit the loop when the index is 6
        }

        const element = news[index];

        // Process description and name to replace \n with <br>
        let shortDescription = element["description" + currentLanguage] || "";
        shortDescription = shortDescription.length > 100 
            ? shortDescription.substring(0, 100) + "..."
            : shortDescription;
        shortDescription = shortDescription.replace(/\n/g, '<br>').replace(/\\"/g, '"');

        let name = element["name" + currentLanguage] || "No Title";
        name = name.replace(/\n/g, '<br>').replace(/\\"/g, '"');

        let createdAtDate = new Date(element.createdAt);
        let formattedDate = createdAtDate.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let newHTML = `
        <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
            <div class="h-entry">
                <a href="single.html?PostId=${element.id}">
                    <img src="${baseFileUrl}/${element.photo}" alt="Image" class="img-fluid post-img">
                </a>
                <h2 class="font-size-regular"><a href="single.html?PostId=${element.id}">${name}</a></h2>
                <div class="meta mb-4">Olmazor tumani axborot xizmati <span class="mx-2">&bullet;</span>${formattedDate}<span class="mx-2">&bullet;</span></div>
                <p>${shortDescription}</p>
                <p><a href="single.html?PostId=${element.id}" data-i18n="button.read_more">Continue Reading...</a></p>
            </div> 
        </div>
        `;

        row.insertAdjacentHTML("beforeend", newHTML);
    }
}
