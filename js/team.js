import { baseFileUrl } from "./data.js";
import { getCurrentLanguage } from "./translation.js";

export function renderTeamMembers(Data, categories) {
    let employees = Data.employees;
    const teamMembersContainer = document.getElementById("team-members");
    const currentLanguage = getCurrentLanguage();

    const filtersDiv = document.getElementById("team-filters");

    // Create and append buttons
    categories.forEach((category, index) => {
        const button = document.createElement("button");
        button.className = "btn btn-primary";
        if (index === 0) {
            button.classList.add("active");
        }
        button.setAttribute("employee-data-filter", `.${category.id}`);
        button.textContent = category["name" + currentLanguage];
        button.addEventListener("click", () => filterTeamMembers(category.id));

        filtersDiv.appendChild(button);
    });

    // Render the team members
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
      const memberHTML = `
            <div class="col-md-6 col-lg-3 mb-4 category-${employee.category.id}" data-aos="fade-up" data-aos-delay="${index * 100}">
              <div class="team-member ">
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
                <h3>${firstName} ${lastName}</h3>
                  <span class="position">Position: ${employee["position"+ currentLanguage]}</span>
                <p><a href="single.html?EmployeeId=${employee.id}">Learn More</a></p>
              </div>
            </div>
        `;

        teamMembersContainer.insertAdjacentHTML('beforeend', memberHTML);
    });

    // Initialize the filter to display members of the first category
    filterTeamMembers(categories[0].id);
}

// Filter function to display the selected category
function filterTeamMembers(categoryId) {
    document.querySelectorAll("#team-filters button").forEach(button => {
        button.classList.remove("active");
    });
    document.querySelector(`[employee-data-filter='.${categoryId}']`).classList.add("active");

    document.querySelectorAll("#team-members .col-md-6").forEach(member => {
        member.style.display = "none";
    });

    const filteredMembers = document.querySelectorAll(`#team-members .category-${categoryId}`);

    for (let index = 0; index < filteredMembers.length; index++) {
        if (index === 6) {
            break;
        }
        filteredMembers[index].style.display = "block";
    }
}