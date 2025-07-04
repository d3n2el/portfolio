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
function showSlide(newIndex, oldIndex = -1) {
    if (isAnimating) {
        return;
    }
    isAnimating = true;

    const slides = getActiveSlides();

    if (newIndex < 0 || newIndex >= slides.length) {
        isAnimating = false;
        console.error("Slide index outside of bounds. Please check what is happening");
        return;
    }

    const direction = newIndex > oldIndex ? 1 : -1;

    const currentSlide = (oldIndex !== -1 && oldIndex < slides.length) ? slides[oldIndex] : null;
    const nextSlide = slides[newIndex];

    if (nextSlide) {
        const isVertical = currentSlideMode === "vertical";
        const initialPos = direction === 1 ? '100%' : '-100%';
        nextSlide.style.transform = isVertical ? `translateY(${initialPos})` : `translateX(${initialPos})`;
        nextSlide.style.opacity = '0'; 
        nextSlide.classList.add('active'); 
    }

    void document.body.offsetWidth; 

    if (currentSlide) {
        const isVertical = currentSlideMode === 'vertical';
        const finalPos = direction === 1 ? '-100%' : '100%';
        currentSlide.style.transform = isVertical ? `translateY(${finalPos})` : `translateX(${finalPos})`;
        currentSlide.style.opacity = '0'; 
    }

    const transitionSpeed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--slide-transition-speed")) * 1000;

    setTimeout(() => {
        isAnimating = false; 

        if (currentSlide) {
            currentSlide.classList.remove('active');
            currentSlide.style.transform = '';
            currentSlide.style.opacity = '';
        }

        slides.forEach((s, i) => {
            if (i === newIndex) {
                s.classList.add('active');
                s.style.transform = '';
                s.style.opacity = '';
            } else {
                s.classList.remove('active');
                s.style.transform = '';
                s.style.opacity = '';
            }
        });

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
    currentSlideMode = mode;
    index = 0
    // before adding things, wanna make a cleanup
    slidesOverlay.classList.remove('fun-mode', 'vertical-mode')

    slidesOverlay.classList.add('visible');
    if(mode === 'vertical'){
    slidesOverlay.classList.toggle('vertical-mode');
    } else if (mode === 'fun') {
        slidesOverlay.classList.add('fun-mode')
    }
    // CLEAR ALL SLIDE ELEMENTS AND INLINE STYLES, HOPE THIS WORKS
    document.querySelectorAll('.slides-container').forEach(container => {
        container.style.cssText = '';
    })
    // clearactive classes and inline styles from all slides set and its items
    document.querySelectorAll('.slide-set').forEach(set => {
        set.classList.remove('active-set')
        set.style.cssText = '';
        set.querySelectorAll('.slide-item').forEach(item => {
            item.classList.remove('active');
            item.style.transform = "";
            item.style.opacity = '';
            item.style.top = '';
            item.style.position = '';
            item.style.height = '';
        })
    })
    updateNavButtons();
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

