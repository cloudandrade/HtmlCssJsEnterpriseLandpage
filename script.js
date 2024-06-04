document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.right');
    const prevButton = document.querySelector('.carousel-button.left');
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateButtons = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };

    // When I click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const targetIndex = slides.findIndex(slide => slide === prevSlide);

        if (!prevSlide) {
            moveToSlide(track, currentSlide, slides[slides.length - 1]);
            updateButtons(slides, prevButton, nextButton, slides.length - 1);
        } else {
            moveToSlide(track, currentSlide, prevSlide);
            updateButtons(slides, prevButton, nextButton, targetIndex);
        }
    });

    // When I click right, move slides to the right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const targetIndex = slides.findIndex(slide => slide === nextSlide);

        if (!nextSlide) {
            moveToSlide(track, currentSlide, slides[0]);
            updateButtons(slides, prevButton, nextButton, 0);
        } else {
            moveToSlide(track, currentSlide, nextSlide);
            updateButtons(slides, prevButton, nextButton, targetIndex);
        }
    });

    // Set the first slide as the current slide
    slides[1].classList.add('current-slide');
});