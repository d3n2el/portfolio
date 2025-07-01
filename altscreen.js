const ExploreButton = document.getElementById("explore-button")
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const slidesOverlay = document.getElementById("slidesOverlay")
const closeOverlayButton = document.getElementById("closeOverlayButton")
const funButton = document.getElementById("fun-button")
const mainName = document.querySelector(".main-name")
const starButton = document.querySelector(".star-button")
let currentSlideIndex = 0
let isAnimating = false // avoid multiple animations later on
// check when button is clicked
// need to make disappear the landing page or just make the 1st slide appear over it completely so that it is not visible
// after that, I need to say hey, I need the 1st slide at index 0
// then, call the showslide function to actually display slide-items etc of the current slide
// should also generate the dots to keep track, will do this last since I might wanna change this
funButton.addEventListener('click',() =>{
  funButton.classList.toggle('active');
  mainName.classList.toggle('active'); 
  ExploreButton.classList.toggle('active');
  starButton.classList.toggle('active');
})
ExploreButton.addEventListener('click', () => {
    slidesOverlay.classList.add('visible'); // Make the overlay visible via CSS class.
    currentSlideIndex = 0; // later on useful for dots generations and to know which slide to show
    showSlide(currentSlideIndex); // will display current slide, need to code the function later
    generateDots(); // Generate the dot indicators
});
closeOverlayButton.addEventListener('click', () => {
    slidesOverlay.classList.remove('visible');
});
// i will make comments and pseudocode as per usual to guide me through what i need to do
function showSlide(currentSlideIndex){
  //when this function is caled, I need to make appear the slides items at current 
    const slides = document.querySelectorAll('.slide-item')
    // hide all slides initially
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    // Show current slide if it exists
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
}