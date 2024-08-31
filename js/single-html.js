import { baseFileUrl } from './data.js';
import { getCurrentLanguage } from './translation.js';

export function renderSingleHTML(data){
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const employeeCategoryId = urlParams.get('EmployeeCategorId');
    if(employeeCategoryId){
        renderEmployees(data, employeeCategoryId);
        return;
    }
    const employeeId = urlParams.get('EmployeeId');
    if(employeeId){
        renderEmployee(data, employeeId);
        return;
    }
    const postCategoryId = urlParams.get('PostCategoryId');
    if(postCategoryId){
        renderPosts(data, postCategoryId);
        return;
    }
    const postId = urlParams.get('PostId');
    if(postId){
        renderPost(data, postId);
        return;
    }
    
    const sectors = urlParams.get('Sectors');
    console.log(sectors);
    if(sectors){
        renderSectors(data);
        return;
    }

    const sector = urlParams.get('Sectors');
    if(sector){
        console.log("ALOOOO");
        return;
    }

    renderPost(data, 1);

}

function renderEmployees(Data, categoryId){
    let employees = Data.employees.filter(e => e.category.id == categoryId);

    const currentLanguage = getCurrentLanguage();

    const container = document.getElementById("single-html-container");

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = employees[0].category["name" + currentLanguage];
    container.appendChild(h2);

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return; // Or handle the error accordingly
    }
    employees.forEach((employee, index) => {
        let firstName;
        let lastName;
        switch(currentLanguage){
          case "Ru":
            firstName = employee.firstnameRu;
            lastName = employee.lastnameRu;
            break;
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
                    <h4>${employee["position"+ currentLanguage]}</h4>
                    <h4 class="text-primary">${firstName} ${lastName}</h4>
                    <p><strong>Ish joyi : </strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong>Телефон :</strong> ${employee.phone1 ?? employee.phone2}  ${employee.phone1 ?? employee.phone1}</p>
                    <p><strong>Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong>Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]},  ${formattedDate}</p>
                    <p><strong>Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
                </div>
            </div>
            <hr>
          `;
  
          container.insertAdjacentHTML('beforeend', memberHTML);
      });
}

function renderEmployee(Data, employeeId){
    let employees = Data.employees.filter(e => e.id == employeeId);
    console.log("EMPLOYEE:", employees);

    const currentLanguage = getCurrentLanguage();

    const container = document.getElementById("single-html-container");

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = employees[0].category["name" + currentLanguage];
    container.appendChild(h2);

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return; // Or handle the error accordingly
    }
    employees.forEach((employee, index) => {
        let firstName;
        let lastName;
        switch(currentLanguage){
          case "Ru":
            firstName = employee.firstnameRu;
            lastName = employee.lastnameRu;
            break;
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
                    <h4>${employee["position"+ currentLanguage]}</h4>
                    <h4 class="text-primary">${firstName} ${lastName}</h4>
                    <p><strong>Ish joyi : </strong> ${employee["workPlace" + currentLanguage]}</p>
                    <p><strong>Телефон :</strong> ${employee.phone1 ?? employee.phone2}  ${employee.phone1 ?? employee.phone1}</p>
                    <p><strong>Millati:</strong> ${employee["nationality" + currentLanguage]}</p>
                    <p><strong>Tug'ilgan joyi va sanasi :</strong> ${employee["birthPlace" + currentLanguage]},  ${formattedDate}</p>
                    <p><strong>Фуқароларни қабул қилиш: </strong> ${employee["receptionTime" + currentLanguage]}</p>
                </div>
            </div>
            <hr>
          `;
  
          container.insertAdjacentHTML('beforeend', memberHTML);
      });
}

function renderPosts(Data, categoryId){
    let posts = Data.posts.filter(e => e.category.id == categoryId);
    console.log("POSTS:", posts);

    const currentLanguage = getCurrentLanguage();

    const container = document.getElementById("single-html-container");

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = posts[0].category["name" + currentLanguage];
    container.appendChild(h2);

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return; // Or handle the error accordingly
    }

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
                    <img src="${baseFileUrl}/${p.photo}" alt="Photo" class="img-fluid">
                </div>
                <div class="col-md-9">
                    <h4 class="text-primary">${p["name" + currentLanguage]}</h4>
                    <p>${p["description" + currentLanguage]}</p>
                    <p><strong>Sana: </strong> ${formattedDate} ${formattedTime}</p>
                </div>
            </div>
            <hr>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });
}

function renderPost(Data, postId){
    let post = Data.posts.filter(p => p.id == postId);

    const currentLanguage = getCurrentLanguage();

    const container = document.getElementById("single-html-container");

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = post[0].category["name" + currentLanguage];
    container.appendChild(h2);

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return; // Or handle the error accordingly
    }

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
                <div class="col-md-9">
                    <h4 class="text-primary">${p["name" + currentLanguage]}</h4>
                    <p>${p["description" + currentLanguage]}</p>
                    <p><strong>Sana: </strong> ${formattedDate} ${formattedTime}</p>
                </div>
            </div>
            <hr>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });
}

function renderSectors(Data){
    let sectors = Data.sectors;

    const currentLanguage = getCurrentLanguage();

    const container = document.getElementById("single-html-container");

    const h2 = document.createElement("h2");
    h2.classList.add("mt-4", "mb-5");
    h2.textContent = "Secotrlar";
    container.appendChild(h2);

    if (!container) {
        console.error("Container with ID 'single-html-container' not found.");
        return; // Or handle the error accordingly
    }

    sectors.forEach(p => {
        let firstName;
        let lastName;
        switch(currentLanguage){
          case "Ru":
            firstName = p.employee.firstnameRu;
            lastName = p.employee.lastnameRu;
            break;
          case "UzRu":
            firstName = p.employee.firstnameRu;
            lastName = p.employee.lastnameRu;
            break;
          default:
            firstName = p.employee.firstnameEn;
            lastName = p.employee.lastnameEn;
            break;
        }
        console.log(`${baseFileUrl}/${p.photo}`);
        let htmlContent = `
            <div class="row mb-3">
                <div class="col-md-3">
                    <img src="${baseFileUrl}/${p.photo}" alt="Photo" class="img-fluid">
                </div>
                <div class="col-md-9">
                    <h3 class="text-primary">${p["name" + currentLanguage]}</h3>
                    <h5><strong>Rahbari: </strong>${firstName} ${lastName}</h5>
                    <p><strong>Address: </strong> ${p.location["name"+ currentLanguage]}</p>
                    <p>${p["description" + currentLanguage]}</p>
                </div>
            </div>
            <hr>
        `;
        container.insertAdjacentHTML('beforeend', htmlContent);
    });
}