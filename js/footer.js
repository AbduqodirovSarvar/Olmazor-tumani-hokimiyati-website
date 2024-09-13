import { baseFileUrl } from "./data.js";
import { getCurrentLanguage } from "./translation.js";

export function renderFooterSection(Data){
    let footer = document.getElementById("footer-section");

    let usefulLink = footer.querySelector(".d-flex.justify-content-between.gap-2");

    let links = Data.usefulLinks;

    links.forEach((link, index) => {
        let linkHTML = `
        <div class="d-flex flex-column image-width">
            <a target="_blank" href="${link.link}">
                <img class="img-width" src="${baseFileUrl}/${link.photo}" alt="img">
                <p class="text-center" style="color: white;">${link["name" + getCurrentLanguage()]}</p>
            </a>
        </div>
        `;
        usefulLink.insertAdjacentHTML('beforeend', linkHTML);
    });
    setItems(Data);
}

export function setItems(data){
    let address = document.querySelectorAll(".address");
    address.forEach(e => {
        e.textContent = data.about.location["name" + getCurrentLanguage()];
    })
    let phone = document.querySelectorAll(".phone");
    phone.forEach(e => {
        e.textContent = data.contacts.filter(c => c.type.id == 1)[0].value;
        e.href = "tel:"+ data.contacts.filter(c => c.type.id == 1).value;
    });
    let telegram = document.querySelectorAll('.telegram');
    telegram.forEach(a => {
        a.href = data.contacts.filter(c => c.type.id == 3)[0].value;
    });

    let instagram = document.querySelectorAll('.instagram');
    instagram.forEach(a => {
        a.href = data.contacts.filter(c => c.type.id == 4)[0].value;
    });

    let facebook = document.querySelectorAll('.facebook');
    facebook.forEach(a => {
        a.href = data.contacts.filter(c => c.type.id == 5)[0].value;
    });

    let twitter = document.querySelectorAll('.twitter');
    twitter.forEach(a => {
        a.href = data.contacts.filter(c => c.type.id == 7)[0].value;
    });

    let youtube = document.querySelectorAll('.youtube');
    youtube.forEach(a => {
        a.href = data.contacts.filter(c => c.type.id == 6)[0].value;
    });

    let email = document.querySelectorAll('.email');
    email.forEach(a => {
        a.textContent = data.contacts.filter(c => c.type.id == 10)[0].value;
        a.href = `mailto:${data.contacts.filter(c => c.type.id == 10)[0].value}`;
    });
}