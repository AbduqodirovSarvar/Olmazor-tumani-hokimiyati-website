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
    setItems(Data);
}

export function setItems(data){
    let address = document.querySelectorAll(".address");
    address.forEach(e => {
        console.log(e);
    })
    let phone = document.querySelectorAll(".phone");
    phone.forEach(e => {
        console.log(e);
    });
    let telegram = document.querySelectorAll('.telegram');
    telegram.forEach(a => {
        a.href = `https://t.me/`;
    });

    let instagram = document.querySelectorAll('.instagram');
    instagram.forEach(a => {
        a.href = `https://www.instagram.com/`;
    });

    let facebook = document.querySelectorAll('.facebook');
    facebook.forEach(a => {
        a.href = `https://www.facebook.com/`;
    });

    let twitter = document.querySelectorAll('.twitter');
    twitter.forEach(a => {
        a.href = `https://www.twitter.com/`;
    });

    let youtube = document.querySelectorAll('.youtube');
    youtube.forEach(a => {
        a.href = `https://www.youtube.com/`;
    });

    let email = document.querySelectorAll('.email');
    email.forEach(a => {
        a.href = `mailto:test`;
    });
}