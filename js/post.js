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
    const categoryIds = [6, 7, 9, 10, 11, 12];
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
        button.textContent = category["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"'); // Replace new lines with <br>
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
        shortDescription = shortDescription.replace(/\n/g, '<br>').replace(/\\"/g, '"'); // Replace new lines with <br>

        let name = post["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"'); // Replace new lines with <br>

        // const mediaHTML = isVideoFile(post.photo)
        //     ? `<video class="img-fluid post-video" controls>
        //           <source src="${baseFileUrl}/${post.photo}" type="video/mp4">
        //           Your browser does not support the video tag.
        //        </video>`
        //     : `<img class="img-fluid post-img" src="${baseFileUrl}/${post.photo}">`;

        let mediaHTML = '';
        
        if (post.images && post.images.length > 0) {
            mediaHTML = isVideoFile(post.images[0].name)
            ? `<video class="img-fluid post-video" controls>
                  <source src="${baseFileUrl}/${post.images[0].name}" type="video/mp4">
                  Your browser does not support the video tag.
               </video>`
            : `<img class="img-fluid post-img" src="${baseFileUrl}/${post.images[0].name}">`;
        } else if (post.photo) {
            mediaHTML = isVideoFile(post.photo)
            ? `<video class="img-fluid post-video" controls>
                  <source src="${baseFileUrl}/${post.photo}" type="video/mp4">
                  Your browser does not support the video tag.
               </video>`
            : `<img class="img-fluid post-img" src="${baseFileUrl}/${post.photo}">`;
        } else {
            mediaHTML = `<div class="col-12 text-center">No media available.</div>`;
        }

        const postHTML = `
        <div class="item web col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-5 category-${post.category.id}">
            <a href="${baseFileUrl}/${post.photo}" class="item-wrap mb-2" data-fancybox="gallery1">
              ${mediaHTML}
            </a>
            <h3>${name}</h3>
            <p>${shortDescription}</p>
            <p><a href="single.html?PostId=${post.id}" data-i18n="button.read_more">Learn More</a></p>
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

function isVideoFile(fileName) {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
}
