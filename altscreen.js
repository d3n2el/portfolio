const ExploreButton = document.getElementById("explore-button")
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const slidesOverlay = document.getElementById("slidesOverlay")
const closeOverlayButton = document.getElementById("closeOverlayButton")
const funButton = document.getElementById("fun-button")
const mainName = document.querySelector(".main-name")
const starButton = document.querySelector(".star-button")
const dotsContainer = document.getElementById("dotsContainer")
let index = 0
let isAnimating = false // avoid multiple animations later on


function toggleFunModeClasses() {
    const elementsToToggle = [
        funButton, mainName, ExploreButton, starButton,
        slidesOverlay, closeOverlayButton, prevButton, nextButton
    ];
    elementsToToggle.forEach(el => el.classList.toggle('active'));
}


function getActiveSlides() {
    const isFunMode = funButton.classList.contains('active');
    const selector = isFunMode ? '.fun-slides .slide-item' : '.normal-slides .slide-item';
    return document.querySelectorAll(selector);
}

function showSlide(slideIndex){
    isAnimating= true
  //when this function is caled, I need to make appear the slides items at current 
    const slides = getActiveSlides()
    if(index < 0 || index >= slides.length){
        isAnimating = false;
        console.error("Slide index outside of bounds. Please check what is happening")
        return;
    }
    // hide all slides initially
    prevButton.disabled = true;
    nextButton.disabled = true;
    slides.forEach(slide => {
        
        slide.classList.remove('active');
    });
    // Show current slide if it exists
    const targetSlide = slides[slideIndex]
    if(targetSlide) {
        void targetSlide.offsetWidth;
        targetSlide.classList.add('active');
    }
    updateNavButtons();
    updateDots();
    //need to add a way to reset isanimating after an animation
    const transitionSpeed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--slide-transition-speed")) *1000;
    setTimeout(() => {
        isAnimating = false;
    }, transitionSpeed);
}

function moveSlide(direction) {
    if(isAnimating){
        return;
    }
    // get all slides
    const slides = getActiveSlides();
    // add variable to keep track of user input and put new index
    let newIndex = index + direction;

    if(newIndex >= 0 && newIndex < slides.length){
        index = newIndex;
        showSlide(index);
    }
}

function generateDots() {

    dotsContainer.innerHTML = '' // line to clear existing dots
    const slides = getActiveSlides(); // put later just so that first it clears and only after it tries something
    // otherwise it might create problems

    slides.forEach((_,i ) =>{ // i to avoid confusion with index
        const dot = document.createElement('span')
        dot.classList.add('dot');

        dot.addEventListener('click', () =>{
            if(!isAnimating && i !== index) {
                index = i;
                showSlide(index)
            }
        })
        dotsContainer.appendChild(dot);
    })
}

function updateDots() {
    const dots = document.querySelectorAll('.dot')
    dots.forEach((dot, i) =>{
        dot.classList.toggle('active', i === index);
    });
}

function updateNavButtons() {
    const slides = getActiveSlides();
    prevButton.disabled = index === 0;
    nextButton.disabled = index === slides.length -1;
}

function openSlides() {
    slidesOverlay.classList.add('visible');
    index = 0
    generateDots()
    showSlide(index)
}


funButton.addEventListener('click',() =>{
    toggleFunModeClasses();
    if(slidesOverlay.classList.contains('visible')) {
        openSlides();
    }
  
})

ExploreButton.addEventListener('click', openSlides);
starButton.addEventListener('click', openSlides);

closeOverlayButton.addEventListener('click', () => {
    slidesOverlay.classList.remove('visible');
    

});

prevButton.addEventListener('click', () => moveSlide(-1));
nextButton.addEventListener('click', () => moveSlide(1));





