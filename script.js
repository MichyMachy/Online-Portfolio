// --- HEADER SCROLL ---
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// --- FADE-IN ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- TECH STACK AUTO-SCROLLER ---
const scrollers = document.querySelectorAll(".scroller");
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}
function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".scroller-inner");
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

// --- PROJECTS SLIDER ---
const carousel = document.querySelector('.projects-carousel');

if (carousel) {
    const sliderWrapper = carousel.querySelector('.slider-wrapper');
    const slides = carousel.querySelectorAll('.project-slide');
    const prevBtn = carousel.querySelector('.slider-btn.prev');
    const nextBtn = carousel.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    const slideCount = slides.length;

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = ''; 
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
        });
    }

    // Set initial state
    updateSlider();
}