const ExploreButton = document.getElementById("explore-button")
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const slidesOverlay = document.getElementById("slidesOverlay")
const closeOverlayButton = document.getElementById("closeOverlayButton")
const funButton = document.getElementById("fun-button")
const mainName = document.querySelector(".main-name")
const starButton = document.querySelector(".star-button")
let index = 0
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
    index = 0; // later on useful for dots generations and to know which slide to show
    showSlide(index); // will display current slide, need to code the function later
    generateDots(); // Generate the dot indicators
});
closeOverlayButton.addEventListener('click', () => {
    slidesOverlay.classList.remove('visible');

});

prevButton.addEventListener('click', () =>{ 
    if(!isAnimating){
        moveSlide(-1)  //will need to code this later, now just laying structure
    }    
})
nextButton.addEventListener('click', () =>{
    if(!isAnimating){
        moveSlide(1)
    }
})

// i will make comments and pseudocode as per usual to guide me through what i need to do
function showSlide(index){
  //when this function is caled, I need to make appear the slides items at current 
    const slides = document.querySelectorAll('.slide-item')
    if(index < 0 || index >= slides.length){
        console.error("Slide index outside of bounds. Please check what is happening")
        return;
    }
    // hide all slides initially
    slides.forEach(slide => {
        
        slide.classList.remove('active');
    });
    // Show current slide if it exists
    if(slides[index]) {
        void slides[index].offsetWidth;
        slides[index].style.transition = `transform var(--slide-transition-speed) var(--slide-transition-ease), opacity var(--slide-transition-speed) var(--slide-transition-ease)`
        slides[index].classList.add('active');
    }
    //need to add a way to reset isanimating after an animation
    const transitionSpeed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--slide-transition-speed")) *1000;
    setTimeout(() => {
        isAnimating = false;
    }, transitionSpeed);
    updateDots();

}
function moveSlide(direction) {
    // get all slides
    const slides = document.querySelectorAll('.slide-item');
    // add variable to keep track of user input and put new index
    let newIndex = index + direction;

    if(newIndex >= slides.length) {
        newIndex = 0;
    }
    else if(newIndex < 0) {
        newIndex = slides.length - 1;
    }
    index = newIndex
    showSlide(index);
}

function generateDots() {
    const dotsContainer = document.getElementById("dotsContainer")
    const slides = document.querySelectorAll(".slide-item")
    dotsContainer.innerHTML = '' // line to clear existing dots

    slides.forEach((_,Index) =>{
        const dot = document.createElement('span')
        dot.classList.add('dot');
        if (Index === index){
            dot.classList.add("active");
        }
        dot.addEventListener('click', () =>{
            showSlide(index)
        })
        dotsContainer.appendChild(dot);
    })
}

function updateDots() {
    const dots = document.querySelectorAll('.dots-container .dot')
    dots.forEach((dot, Index) =>{
        if (Index === index){
            dot.classList.add('active')
        } else{
            dot.classList.remove('active')
        }
    })
}