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

export function setItems(data) {
    let address = document.querySelectorAll(".address");
    address.forEach(e => {
        const location = data.about.location["name" + getCurrentLanguage()];
        e.textContent = location || "Location not available";
    });

    let phone = document.querySelectorAll(".phone");
    phone.forEach(e => {
        const contact = data.contacts.filter(c => c.type.id === 1)[0];
        if (contact && contact.value) {
            e.textContent = contact.value;
            e.href = `tel:${contact.value}`;
        } else {
            e.textContent = "Phone not available";
        }
    });

    let telegram = document.querySelectorAll('.telegram');
    telegram.forEach(a => {
        const contact = data.contacts.filter(c => c.type.id === 3)[0];
        a.href = contact?.value || "#";
    });

    let instagram = document.querySelectorAll('.instagram');
    instagram.forEach(a => {
        const contact = data.contacts.filter(c => c.type.id === 4)[0];
        a.href = contact?.value || "#";
    });

    let facebook = document.querySelectorAll('.facebook');
    facebook.forEach(a => {
        const contact = data.contacts.filter(c => c.type.id === 5)[0];
        a.href = contact?.value || "#";
    });

    let twitter = document.querySelectorAll('.twitter');
    twitter.forEach(a => {
        const contact = data.contacts.filter(c => c.type.id === 7)[0];
        a.href = contact?.value || "#";
    });

    let youtube = document.querySelectorAll('.youtube');
    youtube.forEach(a => {
        const contact = data.contacts.filter(c => c.type.id === 6)[0];
        a.href = contact?.value || "#";
    });

    let email = document.querySelectorAll('.email');
    email.forEach(a => {
        const contact = data.contacts.filter(c => c.type.id === 10)[0];
        if (contact && contact.value) {
            a.textContent = contact.value;
            a.href = `mailto:${contact.value}`;
        } else {
            a.textContent = "Email not available";
        }
    });
}
