document.addEventListener('DOMContentLoaded', () => {
    console.log("Team website loaded");

    // Carousel Functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-indicators');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;
    let autoSlideTimer;

    const updateCarousel = (index) => {
        // Update track position
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update indicators
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentIndex = index;
    };

    const nextSlide = () => {
        let index = currentIndex + 1;
        if (index >= slides.length) index = 0;
        updateCarousel(index);
    };

    const prevSlide = () => {
        let index = currentIndex - 1;
        if (index < 0) index = slides.length - 1;
        updateCarousel(index);
    };

    // Event Listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('.indicator');
        if (!targetDot) return;

        const targetIndex = dots.indexOf(targetDot);
        updateCarousel(targetIndex);
        resetAutoSlide();
    });

    // Auto Slide
    const startAutoSlide = () => {
        autoSlideTimer = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    };

    // Initialize
    startAutoSlide();
});
