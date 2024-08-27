import { baseFileUrl } from './data.js';

export function renderProjectSection(Data) {
    const filteredPosts = Data.posts.filter(post => post.category.id === 8);
    
    if (filteredPosts.length === 0) {
        // If no posts are found for the category, do not render the section
        return;
    }

    let currentLanguage = "En";

    // Create the HTML structure
    const sectionHTML = `
        <div class="container">
            <div class="row mb-5 justify-content-center">
                <div class="col-md-7 text-center">
                    <h2 class="section-title mb-3" data-aos="fade-up" data-aos-delay="">Tumandagi loyihalar</h2>
                    <p class="lead" data-aos="fade-up" data-aos-delay="100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
                    <div class="owl-carousel slide-one-item-alt">
                        <!-- Images will be injected here by JS -->
                    </div>
                    <div class="custom-direction">
                        <a href="#" class="custom-prev"><span><span class="icon-keyboard_backspace"></span></span></a>
                        <a href="#" class="custom-next"><span><span class="icon-keyboard_backspace"></span></span></a>
                    </div>
                </div>
                <div class="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
                    <div class="owl-carousel slide-one-item-alt-text">
                        <!-- Text slides will be injected here by JS -->
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert the HTML into the section
    const container = document.querySelector('#site-section');
    container.innerHTML = sectionHTML;

    // Check if the container exists
    if (!container) {
        console.error('Container element not found.');
        return;
    }

    // Set the section title and description (though it's already in the HTML)
    const titleElement = container.querySelector('.section-title');
    if (titleElement) {
        titleElement.textContent = 'Tumandagi loyihalar';
    } else {
        console.error('Title element not found.');
    }

    const leadElement = container.querySelector('.lead');
    if (leadElement) {
        leadElement.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus minima neque tempora reiciendis.';
    } else {
        console.error('Lead element not found.');
    }

    // Clear previous content of the carousel and text sections
    const imageCarousel = container.querySelector('.owl-carousel.slide-one-item-alt');
    if (imageCarousel) {
        imageCarousel.innerHTML = '';
    } else {
        console.error('Image carousel element not found.');
    }
    
    const textCarousel = container.querySelector('.owl-carousel.slide-one-item-alt-text');
    if (textCarousel) {
        textCarousel.innerHTML = '';
    } else {
        console.error('Text carousel element not found.');
    }

    filteredPosts.forEach(post => {
        // Add images to the carousel
        if (imageCarousel) {
            const imgElement = document.createElement('img');
            imgElement.src = `${baseFileUrl}/${post.photo}`;
            imgElement.alt = 'Image';
            imgElement.classList.add('img-fluid');
            imageCarousel.appendChild(imgElement);
        }

        // Add text content to the text carousel
        if (textCarousel) {
            const textSlide = document.createElement('div');
            textSlide.innerHTML = `
                <h2 class="section-title mb-3">${post["name" + currentLanguage]}</h2>
                <p class="lead">${post["description" + currentLanguage]}</p>
                <p>${post["description" + currentLanguage]}</p>
                <p><a href="#" class="btn btn-primary mr-2 mb-2">Learn More</a></p>
            `;
            textCarousel.appendChild(textSlide);
        }
    });

    // Initialize the owl carousel (assuming you have already included owl carousel initialization code)
    $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1
        });
    });
}