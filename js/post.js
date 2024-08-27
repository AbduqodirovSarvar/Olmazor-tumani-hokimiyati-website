import { baseFileUrl } from "./data.js";

export function renderPostSection(Data){
    let posts = Data.posts;

    let postSection = document.getElementById("posts");

    const categories = ["All", "Gallary", "E'lonlar", "Yangiliklar"];

    // Get the filters div
    const filtersDiv = document.getElementById("filters");

    // Create and append buttons
    categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "btn btn-primary";
    if (index === 0) {
        button.classList.add("active"); // Set the first button as active
    }
    button.setAttribute("data-filter", index === 0 ? "*" : `.${category.toLowerCase()}`);
    button.textContent = category;
    
    // Append the button to the filters div
    filtersDiv.appendChild(button);
    });

    posts.forEach((post, index) => {
        const postHTML = `
        <div class="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
            <a href="${baseFileUrl}/${post.photo}" class="item-wrap fancybox" data-fancybox="gallery2">
              <span class="icon-search2"></span>
              <img class="img-fluid" src="${baseFileUrl}/${post.photo}">
            </a>
            <h3>${post.nameEn}</h3>
            <p>${post.descriptionEn}</p>
        </div>
        `;

        postSection.insertAdjacentHTML('beforeend', postHTML);
    });
}