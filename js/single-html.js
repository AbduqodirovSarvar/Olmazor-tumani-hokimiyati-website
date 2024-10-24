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
                    <p><strong data-i18n="work_place">Ish joyi : </strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong data-i18n="">Телефон :</strong> ${employee.phone1 ?? employee.phone2}</p>
                    <p><strong data-i18n="single_page.nationality">Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong data-i18n="birthday_place">Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]}, ${formattedDate}</p>
                    <p><strong data-i18n="receptions">Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
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
                    <p><strong data-i18n="single_page.phone_number">Телефон :</strong> ${employee.phone1 ?? employee.phone2} ${employee.phone1 ?? employee.phone1}</p>
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

        const postHTML = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="service-2 h-100">
                    <a href="single.html?PostId=${post.id}" class="d-block">
                        <div class="img-wrap">
                            <img src="${baseFileUrl}/${post.photo}" alt="Image" class="img-fluid">
                        </div>
                        <div class="p-3">
                            <h3 class="text-primary">${post["title" + currentLanguage]}</h3>
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

// function renderPagination(container, totalPages, currentPage, onPageChange) {
//     const paginationWrapper = document.createElement('div');
//     paginationWrapper.className = 'pagination-wrapper';
//     const pagination = document.createElement('ul');
//     pagination.className = 'pagination';

//     for (let i = 1; i <= totalPages; i++) {
//         const pageItem = document.createElement('li');
//         pageItem.className = 'page-item';
//         if (i === currentPage) {
//             pageItem.classList.add('active');
//         }

//         const pageLink = document.createElement('a');
//         pageLink.className = 'page-link';
//         pageLink.href = '#';
//         pageLink.textContent = i;

//         pageLink.addEventListener('click', (event) => {
//             event.preventDefault();
//             onPageChange(i);
//         });

//         pageItem.appendChild(pageLink);
//         pagination.appendChild(pageItem);
//     }

//     paginationWrapper.appendChild(pagination);
//     container.appendChild(paginationWrapper);
// }

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
