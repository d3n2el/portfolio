const ExploreButton = document.getElementById("explore-button")
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const slidesOverlay = document.getElementById("slidesOverlay")
const closeOverlayButton = document.getElementById("closeOverlayButton")
const funButton = document.getElementById("fun-button")
const mainName = document.querySelector(".main-name")
const starButton = document.querySelector(".star-button")
const dotsContainer = document.getElementById("dotsContainer")
const modeSwitchVerticalButton = document.getElementById('mode-switch-vertical')
const scrollUpButton = document.getElementById('scrollUpButton');
const scrollDownButton = document.getElementById('scrollDownButton');
let index = 0
let isAnimating = false // avoid multiple animations later on
let currentSlideMode = 'horizontal'; // either horizontal, fun or vertical. will need to adjust everything later but for rn I just wanna make it work honestly

function toggleFunModeClasses() {
    const elementsToToggle = [
        funButton, mainName, ExploreButton, starButton,
        slidesOverlay, closeOverlayButton, prevButton, nextButton
    ];
    elementsToToggle.forEach(el => el.classList.toggle('active'));

    slidesOverlay.classList.toggle('fun-mode', funButton.classList.contains('active'))


}



function getActiveSlides() {
    document.querySelectorAll('.slide-set').forEach(set => set.classList.remove('active-set')); 

    let activeSet;
    let selector;

    if (currentSlideMode === 'fun') {
        selector = '.fun-slides .slide-item';
        activeSet = document.querySelector('.fun-slides');
    } else if (currentSlideMode === 'vertical') { 
        selector = '.vertical-slides .slide-item';
        activeSet = document.querySelector('.vertical-slides');
    } else {
        selector = '.normal-slides .slide-item';
        activeSet = document.querySelector('.normal-slides');
    }

    if (activeSet) {
        activeSet.classList.add('active-set');
    }
    return document.querySelectorAll(selector);
}

function showSlide(newIndex, oldIndex = -1){
    if(isAnimating){
        return;
    }
    isAnimating= true 
    const slides = getActiveSlides();
    if(index < 0 || index >= slides.length){
        isAnimating = false;
        console.error("Slide index outside of bounds. Please check what is happening")
        return;
    }
    isAnimating = true;
    const direction = newIndex > oldIndex ? 1 : -1;

    const currentSlide= slides[oldIndex];
    const nextSlide = slides[newIndex];

    // prepare the next slide
    if(nextSlide) {
        const isVertical = currentSlideMode === "vertical";
        const initialPos = direction === 1 ? '100%' : '-100%'
        //transform based on mode
        nextSlide.style.transform = isVertical ? `translateY(${initialPos})` : `translateX(${initialPos})`;
        nextSlide.classList.add('active');
    }
    void document.body.offsetWidth;

    if(currentSlide) {
        const isVertical = currentSlideMode ==='vertical';
        // move current slide off screen
        const finalPos = direction === 1 ? '-100%' : '100%';
        currentSlide.style.transform = isVertical ? `translateY(${finalPos})` : `translateX(${finalPos})`;
    }

    //need to add a way to reset isanimating after an animation
    const transitionSpeed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--slide-transition-speed")) *1000;
    setTimeout(() => {
        // cleanup after animation
        if(currentSlide) {
            currentSlide.classList.remove('active');
            currentSlide.style.transform = ''; //reset style
        }
        if(nextSlide) {
            nextSlide.style.transform = ''; //same
        }
        // ensure only correct slide active and all transforms are cleared
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === newIndex);
            s.style.transform = '';
        });
        isAnimating = false;
        updateNavButtons();
        updateDots();
    }, transitionSpeed);
}

function moveSlide(direction) {
    if(isAnimating){
        return;
    }
    // get all slides
    const slides = getActiveSlides();
    // add variable to keep track of user input and put new index
    const oldIndex = index;
    let newIndex = oldIndex + direction;

    if(newIndex >= 0 && newIndex < slides.length){
        index = newIndex;
        showSlide(index, oldIndex);
    }
}
function openSlides(mode = 'horizontal'){
    slidesOverlay.classList.add('visible');
    currentSlideMode = mode;
    index = 0
    // much easier syntax, will need to see if it works though
    slidesOverlay.classList.toggle('vertical-mode', mode === 'vertical');
    slidesOverlay.classList.toggle('fun-mode', funButton.classList.contains('active') && mode !== 'vertical');
    generateDots();
    showSlide(index, -1);


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
                const oldIndex = index
                index = i;
                showSlide(index, oldIndex);
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
    if(currentSlideMode === 'vertical'){
        scrollUpButton.disabled = index ===0;
        scrollDownButton.disabled = index === slides.length - 1;
    } else {
        prevButton.disabled = index === 0;
        nextButton.disabled = index === slides.length -1;
    }
}


funButton.addEventListener('click',() =>{
    toggleFunModeClasses();
    if (slidesOverlay.classList.contains('visible') && currentSlideMode !== 'vertical') {
        currentSlideMode = funButton.classList.contains('active') ? 'fun' : 'horizontal';
        openSlides(currentSlideMode);
    }
  
})

ExploreButton.addEventListener('click', () => openSlides('horizontal'));
starButton.addEventListener('click', () => openSlides('fun'));

closeOverlayButton.addEventListener('click', () => {
    slidesOverlay.classList.remove('visible');
    slidesOverlay.classList.remove('fun-mode', 'vertical-mode') //general clean-up, will see if removing the fun is what i want or not

});

prevButton.addEventListener('click', () => moveSlide(-1));
nextButton.addEventListener('click', () => moveSlide(1));

modeSwitchVerticalButton.addEventListener('click', () => {
    if (currentSlideMode !== 'vertical') {
        openSlides('vertical');
    }
});

scrollUpButton.addEventListener('click', () => moveSlide(-1));
scrollDownButton.addEventListener('click', () => moveSlide(1));

