import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from './translation.js';

const pageSize = 10; // Number of items per page

export function renderSingleHTML(data) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

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
                        <img src="${baseFileUrl}/${employee.photo}" alt="img" class="img-fluid">
                    </figure>
                </div>
                <div class="col-md-9">
                    <h4>${employee["position" + currentLanguage]}</h4>
                    <h4 class="text-primary">${firstName} ${lastName}</h4>
                    <p><strong>Ish joyi : </strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong>Телефон :</strong> ${employee.phone1 ?? employee.phone2}</p>
                    <p><strong>Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong>Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]}, ${formattedDate}</p>
                    <p><strong>Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
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
    h2.textContent = currentPosts.length ? currentPosts[0].category["name" + currentLanguage] : '';
    container.appendChild(h2);

    currentPosts.forEach(p => {
        let createdAtDate = new Date(p.createdAt);
        let formattedDate = createdAtDate.toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        let formattedTime = createdAtDate.toLocaleTimeString("en-GB", {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Use 24-hour format
        });

        let htmlContent = `
            <div class="row mb-3">
                <div class="col-md-3">
                    <a href="single.html?PostId=${p.id}">
                        <img src="${baseFileUrl}/${p.photo}" alt="Photo" class="img-fluid">
                    </a>
                </div>
                <div class="col-md-9">
                    <a href="single.html?PostId=${p.id}">
                        <h4 class="text-primary">${p["name" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</h4>
                    </a>
                    <p>${p["description" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</p>
                    <p><strong>Sana: </strong> ${formattedDate} ${formattedTime}</p>
                </div>
            </div>
            <hr>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });

    renderPagination(container, totalPages, page, (newPage) => {
        renderPosts(Data, categoryId, newPage);
    });
}

function renderSectors(Data, page = 1) {
    let sectors = Data.sectors;
    const totalPages = Math.ceil(sectors.length / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const currentSectors = sectors.slice(start, end);

    if (currentSectors.length === 0) {
        console.error(`No sectors found on page ${page}.`);
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
    h2.textContent = "Sectors";
    container.appendChild(h2);

    currentSectors.forEach(p => {
        let firstName, lastName;
        switch (currentLanguage) {
            case "Ru":
            case "UzRu":
                firstName = p.employee.firstnameRu;
                lastName = p.employee.lastnameRu;
                break;
            default:
                firstName = p.employee.firstnameEn;
                lastName = p.employee.lastnameEn;
                break;
        }

        let htmlContent = `
            <div class="row mb-12">
                <div class="col-md-3">
                    <img src="${baseFileUrl}/${p.photo}" alt="Photo" class="img-fluid">
                </div>
                <div class="col-md-9">
                    <h4 class="text-primary">${p["name" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</h4>
                    <p><strong>Employee: </strong> ${firstName} ${lastName}</p>
                </div>
            </div>
            <hr>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });

    renderPagination(container, totalPages, page, (newPage) => {
        renderSectors(Data, newPage);
    });
}

function renderPagination(container, totalPages, currentPage, onPageChange) {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.href = '#'; // Prevent default link behavior
        pageLink.classList.add(currentPage === i ? 'active' : '');
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            onPageChange(i);
        });
        paginationContainer.appendChild(pageLink);
    }

    container.appendChild(paginationContainer);
}
