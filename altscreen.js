let ExploreButton = document.getElementById("explore-button")

ExploreButton.addEventListener('click', () => {
    slidesOverlay.classList.add('visible'); // Make the overlay visible via CSS class.
    currentSlideIndex = 0; // later on useful for dots generations
    showSlide(currentSlideIndex); // will display current slide, need to code the function later
    generateDots(); // Generate the dot indicators
});