import { baseFileUrl } from "./data.js";
import { getCurrentLanguage } from "./translation.js";

export function renderPostSection(Data, categories) {
    const currentPath = window.location.pathname;
    if (currentPath.includes("single.html")) {
        return;
    }

    let posts = Data.posts;
    let postSection = document.getElementById("posts");

    const currentLanguage = getCurrentLanguage();
    const categoryIds = [2, 4, 6, 7, 9, 10, 11, 12, 13];
    categories = categories.filter(category => categoryIds.includes(category.id));
    
    const filtersDiv = document.getElementById("filters");

    // Create and append buttons
    categories.forEach((category, index) => {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        if (index === 0) {
            button.classList.add("active");
            localStorage.setItem("currentPostCategorId", category.id);
        }
        button.setAttribute("post-data-filter", `.${category.id}`);
        button.textContent = category["name" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"'); // Replace new lines with <br>
        button.addEventListener("click", () => filterPosts(category.id));
        
        // Append the button to the filters div
        filtersDiv.appendChild(button);
    });

    posts.forEach((post, index) => {
        // Process description and name to replace \n with <br>
        let shortDescription = post["description" + currentLanguage];
        shortDescription = shortDescription.length > 100 
            ? shortDescription.substring(0, 100) + "..."
            : shortDescription;
        shortDescription = shortDescription.replace(/\\n/g, '<br>').replace(/\\"/g, '"'); // Replace new lines with <br>

        let name = post["name" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"'); // Replace new lines with <br>

        const postHTML = `
        <div class="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-5 category-${post.category.id}">
            <a href="${baseFileUrl}/${post.photo}" class="item-wrap fancybox mb-2" data-fancybox="gallery2">
              <span class="icon-search2"></span>
              <img class="img-fluid" src="${baseFileUrl}/${post.photo}">
            </a>
            <h3>${name}</h3> <!-- Updated to use name with <br> -->
            <p>${shortDescription}</p> <!-- Updated to use description with <br> -->
            <p><a href="single.html?PostId=${post.id}">Learn More</a></p>
        </div>
        `;

        postSection.insertAdjacentHTML('beforeend', postHTML);
    });
    filterPosts(categories[0].id);
}

function filterPosts(categoryId) {
    document.querySelectorAll("#filters button").forEach(button => {
        button.classList.remove("active");
    });
    document.querySelector(`[post-data-filter='.${categoryId}']`).classList.add("active");
    localStorage.setItem("currentPostCategorId", categoryId);

    document.querySelectorAll("#posts .item").forEach(post => {
        post.style.display = "none";
    });

    const posts = document.querySelectorAll(`#posts .category-${categoryId}`);
    for (let index = 0; index < posts.length; index++) {
        if (index === 4) {
            break;
        }
        posts[index].style.display = "block";
    }    
}
