import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from './translation.js';

const pageSize = 10; // Number of items per page

export function renderSingleHTML(data) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const history = urlParams.get('history');
    if (history) {
        renderHistory(data);
        return;
    }

    const employeeCategoryId = urlParams.get('EmployeeCategorId');
    if (employeeCategoryId) {
        renderEmployees(data, employeeCategoryId === "active" ? localStorage.getItem("currentEmployeeCategorId") ?? 1 : employeeCategoryId);
        return;
    }

    const employeeId = urlParams.get('EmployeeId');
    if (employeeId) {
        renderEmployee(data, employeeId);
        return;
    }

    const postCategoryId = urlParams.get('PostCategoryId');
    if (postCategoryId) {
        renderPosts(data, postCategoryId === "active" ? localStorage.getItem("currentPostCategorId") ?? 1 : postCategoryId);
        return;
    }

    const postId = urlParams.get('PostId');
    if (postId) {
        renderPost(data, postId);
        return;
    }

    const sectors = urlParams.get('Sectors');
    if (sectors) {
        renderSectors(data);
        return;
    }
}

function renderEmployees(Data, categoryId, page = 1) {
    let employees = Data.employees.filter(e => e.category.id == categoryId);
    const totalPages = Math.ceil(employees.length / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const currentEmployees = employees.slice(start, end);

    if (currentEmployees.length === 0) {
        console.error(`No employees found for category ID ${categoryId} on page ${page}.`);
        return;
    }

    if(employees.length < 2){
        renderEmployee(Data, employees[0].id);
        return;
    }

    const currentLanguage = getCurrentLanguage();
    const container = document.getElementById("single-html-container");

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return;
    }

    // Clear container before rendering
    container.innerHTML = '';

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = currentEmployees.length ? currentEmployees[0].category["name" + currentLanguage] : '';
    container.appendChild(h2);

    currentEmployees.forEach(employee => {
        let firstName, lastName;
        switch (currentLanguage) {
            case "Ru":
            case "UzRu":
                firstName = employee.firstnameRu;
                lastName = employee.lastnameRu;
                break;
            default:
                firstName = employee.firstnameEn;
                lastName = employee.lastnameEn;
                break;
        }

        let createdAtDate = new Date(employee.birthday);
        let formattedDate = createdAtDate.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const memberHTML = `
            <div class="row mb-0">
                <div class="col-md-3 team-member">
                    <figure>
                        <ul class="social">
                            <li><a href="#"><span class="icon-facebook"></span></a></li>
                            <li><a href="#"><span class="icon-twitter"></span></a></li>
                            <li><a href="#"><span class="icon-linkedin"></span></a></li>
                            <li><a href="#"><span class="icon-instagram"></span></a></li>
                            <li><a href="#"><span class="icon-telegram"></span></a></li>
                            <li><a href="mailto:${employee.email}"><span class="icon-mail_outline"></span></a></li>
                        </ul>
                        <img src="${baseFileUrl}/${employee.photo}" alt="img" class="img-fluid employee-img">
                    </figure>
                </div>
                <div class="col-md-9">
                    <h4>${employee["position" + currentLanguage]}</h4>
                    <h4 class="text-primary">${firstName} ${lastName}</h4>
                    <p><strong data-i18n="single_page.work_place"></strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong data-i18n="single_page.nationality">Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong data-i18n="single_page.birthday_place">Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]}, ${formattedDate}</p>
                    <p><strong data-i18n="single_page.receptions">Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
                </div>
            </div>
            <hr>
        `;

        container.insertAdjacentHTML('beforeend', memberHTML);
    });

    renderPagination(container, totalPages, page, (newPage) => {
        renderEmployees(Data, categoryId, newPage);
    });
}

function renderEmployee(Data, employeeId) {
    let employees = Data.employees.filter(e => e.id == employeeId);

    if (employees.length === 0) {
        console.error(`No employee found with ID ${employeeId}.`);
        return;
    }

    const currentLanguage = getCurrentLanguage();
    const container = document.getElementById("single-html-container");

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return;
    }

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = employees[0].category["name" + currentLanguage];
    container.appendChild(h2);

    employees.forEach(employee => {
        let firstName, lastName;
        switch (currentLanguage) {
            case "Ru":
            case "UzRu":
                firstName = employee.firstnameRu;
                lastName = employee.lastnameRu;
                break;
            default:
                firstName = employee.firstnameEn;
                lastName = employee.lastnameEn;
                break;
        }

        let createdAtDate = new Date(employee.birthday);
        let formattedDate = createdAtDate.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const memberHTML = `
            <div class="row mb-0">
                <div class="col-md-3 team-member">
                    <figure>
                        <ul class="social">
                            <li><a href="#"><span class="icon-facebook"></span></a></li>
                            <li><a href="#"><span class="icon-twitter"></span></a></li>
                            <li><a href="#"><span class="icon-linkedin"></span></a></li>
                            <li><a href="#"><span class="icon-instagram"></span></a></li>
                            <li><a href="#"><span class="icon-telegram"></span></a></li>
                            <li><a href="mailto:${employee.email}"><span class="icon-mail_outline"></span></a></li>
                        </ul>
                        <img src="${baseFileUrl}/${employee.photo}" alt="img" class="img-fluid employee-img">
                    </figure>
                </div>
                <div class="col-md-9">
                    <h4><strong data-i18n="single_page.position">Position : </strong>${employee["position" + currentLanguage]}</h4>
                    <h4 class="text-primary">${firstName} ${lastName}</h4>
                    <p><strong data-i18n="single_page.work_place">Ish joyi : </strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong data-i18n="single_page.nationality">Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong data-i18n="single_page.birthday_place">Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]}, ${formattedDate}</p>
                    <p><strong data-i18n="single_page.receptions">Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
                </div>
            </div>
            <hr>
        `;

        container.insertAdjacentHTML('beforeend', memberHTML);
    });
}

function renderPosts(Data, categoryId, page = 1) {
    let posts = Data.posts.filter(e => e.category.id == categoryId);
    const totalPages = Math.ceil(posts.length / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const currentPosts = posts.slice(start, end);

    if (currentPosts.length < 1) {
        console.error(`No posts found for category ID ${categoryId} on page ${page}.`);
        return;
    }

    if(posts.length < 2){
        renderPost(Data, posts[0].id);
        return;
    }

    const currentLanguage = getCurrentLanguage();
    const container = document.getElementById("single-html-container");

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return;
    }

    container.innerHTML = '';

    currentPosts.forEach(post => {
        let createdAtDate = new Date(post.createdAt);
        let formattedDate = createdAtDate.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const mediaHTML = isVideoFile(post.photo)
            ? `<video class="img-fluid post-video" controls>
                  <source src="${baseFileUrl}/${post.photo}" type="video/mp4">
                  Your browser does not support the video tag.
               </video>`
            : `<img class="img-fluid post-img" src="${baseFileUrl}/${post.photo}">`;


        const postHTML = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="service-2 h-100">
                    <a href="single.html?PostId=${post.id}" class="d-block">
                        <div class="img-wrap">
                        ${mediaHTML}
                        </div>
                        <div class="p-3">
                            <h3 class="text-primary">${post["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</h3>
                            <p class="mb-0">${formattedDate}</p>
                        </div>
                    </a>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', postHTML);
    });

    renderPagination(container, totalPages, page, (newPage) => {
        renderPosts(Data, categoryId, newPage);
    });
}

function renderPost(Data, postId) {
    const post = Data.posts.find(e => e.id === postId);
    console.log(post);

    if (!post) {
        console.error(`No post found with ID ${postId}.`);
        return;
    }

    const currentLanguage = getCurrentLanguage();
    const container = document.getElementById("single-html-container");

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return;
    }

    container.innerHTML = ''; // Clear existing content

    // Format post date
    let createdAtDate = new Date(post.createdAt);
    let formattedDate = createdAtDate.toLocaleDateString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const mediaHTML = isVideoFile(post.photo)
            ? `<video class="img-fluid post-video" controls>
                  <source src="${baseFileUrl}/${post.photo}" type="video/mp4">
                  Your browser does not support the video tag.
               </video>`
            : `<img class="img-fluid post-img" src="${baseFileUrl}/${post.photo}">`;

    // Render the post content
    const postHTML = `
        <div class="col-md-12 mb-4">
            <div class="service-2 h-100">
                <div class="img-wrap">
                    ${mediaHTML}
                </div>
                <div class="p-3">
                    <h2 class="text-primary">${post["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</h2>
                    <p>${post["description" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</p>
                    <p class="mb-4">${formattedDate}</p>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', postHTML);
}

function renderSectors(Data) {
    const sectors = Data.sectors;

    if (!sectors || sectors.length === 0) {
        console.error("No sectors found.");
        return;
    }

    const currentLanguage = getCurrentLanguage();
    const container = document.getElementById("single-html-container");

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return;
    }

    // Clear previous content if any
    container.innerHTML = "";

    // Add a title to the container
    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = "Sectors";
    container.appendChild(h2);

    // Iterate through each sector and render its content
    sectors.forEach(sector => {
        // Extract sector and employee details based on the current language
        const { employee, photo, location } = sector;
        let firstName, lastName, nationality, workplace, employeePhoto;

        switch (currentLanguage) {
            case "Ru":
            case "UzRu":
                firstName = employee.firstnameRu;
                lastName = employee.lastnameRu;
                break;
            default:
                firstName = employee.firstnameEn;
                lastName = employee.lastnameEn;
                break;
        }

        employeePhoto = employee.photo ? `${baseFileUrl}/${employee.photo}` : "default-employee.png";

        const htmlContent = `
            <div class="row mb-12">
                <div class="col-md-6">
                    <div class="employee-info">
                        <img src="${employeePhoto}" alt="Employee Image" class="img-fluid mb-3 employee-img">
                        <h5>
                            <strong data-i18n="single_page.leader">Leader: </strong>${firstName} ${lastName}
                        </h5>
                        <h4><strong data-i18n="single_page.position">Position : </strong>${employee["position" + currentLanguage]}</h4>
                        <p><strong data-i18n="single_page.nationality">Nationality: </strong>${employee["nationality" + currentLanguage] || "N/A"}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="img-wrap">
                        <img src="${baseFileUrl}/${photo}" alt="Sector Image" class="img-fluid">
                    </div>
                </div>
                <div class="col-md-12 mt-4">
                    <h3 class="text-primary">${sector["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</h3>
                    <p><strong data-i18n="single_page.address">Address: </strong>${location["name" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</p>
                    <p>${sector["description" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"')}</p>
                </div>
            </div>
            <hr style="height: 2px; background-color: black; border: none; margin: 20px 0;">

        `;
        
        container.insertAdjacentHTML('beforeend', htmlContent);
    });
}




function renderHistory(Data){
    let about = Data.about; 

    let currentLanguage = getCurrentLanguage();
    const container = document.getElementById("single-html-container");

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = "";
    h2.setAttribute('data-i18n', 'header.selections.district_history');
    container.appendChild(h2);

    let htmlContent = about["description" + currentLanguage].replace(/\n/g, '<br>').replace(/\\"/g, '"');
    container.insertAdjacentHTML('beforeend', htmlContent);
}

function renderPagination(container, totalPages, currentPage, onPageChange) {
    const paginationWrapper = document.createElement('div');
    paginationWrapper.className = 'pagination-wrapper d-flex justify-content-center mt-4'; // Centering the pagination
    const pagination = document.createElement('ul');
    pagination.className = 'pagination';

    // "Previous" button
    const prevItem = document.createElement('li');
    prevItem.className = 'page-item';
    if (currentPage === 1) {
        prevItem.classList.add('disabled'); // Disable the "Previous" button if on the first page
    }
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.href = '#';
    prevLink.textContent = '<';
    prevLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    });
    prevItem.appendChild(prevLink);
    pagination.appendChild(prevItem);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        if (i === currentPage) {
            pageItem.classList.add('active');
        }

        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;

        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            onPageChange(i);
        });

        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
    }

    // "Next" button
    const nextItem = document.createElement('li');
    nextItem.className = 'page-item';
    if (currentPage === totalPages) {
        nextItem.classList.add('disabled'); // Disable the "Next" button if on the last page
    }
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.textContent = '>';
    nextLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    });
    nextItem.appendChild(nextLink);
    pagination.appendChild(nextItem);

    paginationWrapper.appendChild(pagination);
    container.appendChild(paginationWrapper);
}

function isVideoFile(fileName) {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
}