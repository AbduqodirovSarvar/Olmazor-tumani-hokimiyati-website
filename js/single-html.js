import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from './translation.js';

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

function renderEmployees(Data, categoryId) {
    let employees = Data.employees.filter(e => e.category.id == categoryId);

    if (employees.length === 0) {
        console.error(`No employees found for category ID ${categoryId}.`);
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
                        <img src="${baseFileUrl}/${employee.photo}" alt="img" class="img-fluid">
                    </figure>
                </div>
                <div class="col-md-9">
                    <h4>${employee["position" + currentLanguage]}</h4>
                    <h4 class="text-primary">${firstName} ${lastName}</h4>
                    <p><strong>Ish joyi : </strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong>Телефон :</strong> ${employee.phone1 ?? employee.phone2} ${employee.phone1 ?? employee.phone1}</p>
                    <p><strong>Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong>Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]}, ${formattedDate}</p>
                    <p><strong>Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
                </div>
            </div>
            <hr>
        `;

        container.insertAdjacentHTML('beforeend', memberHTML);
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
                        <img src="${baseFileUrl}/${employee.photo}" alt="img" class="img-fluid">
                    </figure>
                </div>
                <div class="col-md-9">
                    <h4>${employee["position" + currentLanguage]}</h4>
                    <h4 class="text-primary">${firstName} ${lastName}</h4>
                    <p><strong>Ish joyi : </strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong>Телефон :</strong> ${employee.phone1 ?? employee.phone2} ${employee.phone1 ?? employee.phone1}</p>
                    <p><strong>Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong>Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]}, ${formattedDate}</p>
                    <p><strong>Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
                </div>
            </div>
            <hr>
        `;

        container.insertAdjacentHTML('beforeend', memberHTML);
    });
}

function renderPosts(Data, categoryId) {
    let posts = Data.posts.filter(e => e.category.id == categoryId);

    if (posts.length < 2) {
        renderPost(Data, posts[0].id);
        return;
    }

    if (posts.length === 0) {
        console.error(`No posts found for category ID ${categoryId}.`);
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
    h2.textContent = posts[0].category["name" + currentLanguage];
    container.appendChild(h2);

    posts.forEach(p => {
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
                        <p>${p["description" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</p>
                        <p><strong>Sana: </strong> ${formattedDate} ${formattedTime}</p>
                    </a>
                </div>
            </div>
            <hr>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });
}

function renderPost(Data, postId) {
    let post = Data.posts.filter(p => p.id == postId);

    if (post.length === 0) {
        console.error(`No post found with ID ${postId}.`);
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
    h2.textContent = post[0].category["name" + currentLanguage];
    container.appendChild(h2);

    post.forEach(p => {
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
            <div class="mb-3">
                <div class="mt-3 mb-4 single-post-img">
                    <img src="${baseFileUrl}/${p.photo}" alt="Photo">
                </div>
                <div class="col-md-12">
                    <h4 class="text-primary">${p["name" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</h4>
                    <p>${p["description" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</p>
                    <p><strong>Sana: </strong> ${formattedDate} ${formattedTime}</p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });
}

function renderSectors(Data) {
    let sectors = Data.sectors;

    if (sectors.length === 0) {
        console.error("No sectors found.");
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
    h2.textContent = "Sectors";
    container.appendChild(h2);

    sectors.forEach(p => {
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
                <div class="col-md-12">
                    <h3 class="text-primary">${p["name" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</h3>
                    <h5><strong>Rahbari: </strong>${firstName} ${lastName}</h5>
                    <p><strong>Address: </strong> ${p.location["name" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</p>
                    <p>${p["description" + currentLanguage].replace(/\\n/g, '<br>').replace(/\\"/g, '"')}</p>
                </div>
            </div>
            <hr>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });
}
