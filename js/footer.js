import { baseFileUrl } from "./data.js";

export function renderFooterSection(Data){
    let footer = document.getElementById("footer-section");

    let usefulLink = footer.querySelector(".d-flex.justify-content-between.gap-2");

    let links = Data.usefulLinks;

    links.forEach((link, index) => {
        let linkHTML = `
        <div class="d-flex flex-column image-width">
            <a target="_blank" href="${link.link}">
                <img class="img-width" src="${baseFileUrl}/${link.photo}" alt="img">
                <p class="text-center" style="color: white;">${link.nameEn}</p>
            </a>
        </div>
        `;
        usefulLink.insertAdjacentHTML('beforeend', linkHTML);
    });
}