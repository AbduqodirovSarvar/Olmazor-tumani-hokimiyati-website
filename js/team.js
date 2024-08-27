import { baseFileUrl } from "./data.js";

// console.log(Data);
// let employees = Data.employees;
// console.log(employees);
  
export function renderTeamMembers(Data) {
    let employees = Data.employees;
    const teamMembersContainer = document.getElementById("team-members");
    // teamMembersContainer.innerHTML = ''; // Clear existing content

    // Assuming you have an array of categories to generate buttons dynamically
    const categories = ["All", "category1", "category2", "category3", "category4", "category5"];

    // Get the filters div
    const filtersDiv = document.getElementById("team-filters");

    // Clear any existing buttons
    // filtersDiv.innerHTML = "";

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

  
    employees.forEach((employee, index) => {
      const memberHTML = `
        <div class="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="team-member ${employee.category.nameEn.toLowerCase()}">
            <figure>
              <ul class="social">
                <li><a href="#"><span class="icon-facebook"></span></a></li>
                <li><a href="#"><span class="icon-twitter"></span></a></li>
                <li><a href="#"><span class="icon-linkedin"></span></a></li>
                <li><a href="#"><span class="icon-instagram"></span></a></li>
                <li><a href="#"><span class="icon-telegram"></span></a></li>
                <li><a href="mailto:${employee.email}"><span class="icon-mail_outline"></span></a></li>
              </ul>
              <img src="${baseFileUrl}/${employee.photo}" alt="${employee.firstnameEn} ${employee.lastnameEn}" class="img-fluid">
            </figure>
            <div class="p-3">
              <h3>${employee.firstnameEn} ${employee.lastnameEn}</h3>
              <span class="position">${employee.positionEn}</span>
            </div>
          </div>
        </div>
      `;
  
      teamMembersContainer.insertAdjacentHTML('beforeend', memberHTML);
    });


  }
  