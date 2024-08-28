import { baseFileUrl } from "./data.js";

export function renderNewsSection(Data){
    let news = Data.posts.filter(post => post.category.id === 14);

    let newsSection = document.getElementById("blog-section");

    let row = document.getElementById("blog-section-news");
    let a = [1,2,3, 4];

    a.forEach((element, index) => {
        let newHTML = `
        <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
            <div class="h-entry">
              <a href="single.html">
                <img src="images/img_1.jpg" alt="Image" class="img-fluid">
              </a>
              <h2 class="font-size-regular"><a href="#">Where Do You Learn HTML & CSS in 2019?</a></h2>
              <div class="meta mb-4">Ham Brook <span class="mx-2">&bullet;</span> Jan 18, 2019<span class="mx-2">&bullet;</span></div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
              <p><a href="#">Continue Reading...</a></p>
            </div> 
        </div>
        `;

        row.insertAdjacentHTML("beforeend", newHTML);
    });
}