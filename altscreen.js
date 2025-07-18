const exploreButton = document.getElementById("explore-button")
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const slidesOverlay = document.getElementById("slides-overlay")
const closeOverlayButton = document.getElementById("closeOverlayButton")
const funButton = document.getElementById("fun-button")
const mainName = document.querySelector(".main-name")
const starButton = document.querySelector(".star-button")
const dotsContainer = document.getElementById("dotsContainer")
const modeSwitchVerticalButton = document.getElementById('mode-switch-vertical')
const scrollUpButton = document.getElementById('scrollUpButton');
const scrollDownButton = document.getElementById('scrollDownButton');
const emailButton = document.getElementById("email-button");
const instagramButton = document.getElementById("instagram-button");
const creditsButton = document.getElementById('credits-button');

let index = 0
let isAnimating = false // avoid multiple animations later on
let currentSlideMode = 'horizontal'; // either horizontal, fun or vertical. will need to adjust everything later but for rn I just wanna make it work honestly
let verticalSlideCategory = null;
function toggleFunModeClasses() {
    const elementsToGetFunModeActive = [ //changing names to be fore specific
        funButton, mainName, exploreButton, starButton,
        closeOverlayButton, prevButton, nextButton  //eliminated slidesOverlay because it was getting both fun-mode and fun-moe-active, idk if it was causing problems but better safe than worry
    ];
    elementsToGetFunModeActive.forEach(el =>{
        if(el){ // better to check if first it exists or not
             el.classList.toggle('fun-mode-active')}});

    slidesOverlay.classList.toggle('fun-mode', funButton.classList.contains('fun-mode-active'))


}



function getActiveSlides() {
    document.querySelectorAll('.slide-set').forEach(set => set.classList.remove('active-set')); 

    let activeSet;
    let selector;

    if (currentSlideMode === 'fun') {
        selector = '.fun-slides .slide-item';
        activeSet = document.querySelector('.fun-slides');
    } else if (currentSlideMode === 'vertical') { 
        selector = `.vertical-slides .slide-item[data-category="${verticalSlideCategory}"]`;
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
        updateFixedButtonColors();

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
function openSlides(mode = 'horizontal', category = null){
    currentSlideMode = mode;
    verticalSlideCategory = category;
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
    const isFun = currentSlideMode === 'fun';
    // Hide/show horizontal nav buttons
    prevButton.classList.toggle('horizontal-nav', currentSlideMode !== 'vertical');
    nextButton.classList.toggle('horizontal-nav', currentSlideMode !== 'vertical');
    prevButton.classList.toggle('vertical-nav', currentSlideMode === 'vertical');
    nextButton.classList.toggle('vertical-nav', currentSlideMode === 'vertical');


    // Hide/show vertical nav buttons
    scrollUpButton.classList.toggle('vertical-nav', currentSlideMode === 'vertical');
    scrollDownButton.classList.toggle('vertical-nav', currentSlideMode === 'vertical');
    scrollUpButton.classList.toggle('horizontal-nav', currentSlideMode !== 'vertical');
    scrollDownButton.classList.toggle('horizontal-nav', currentSlideMode !== 'vertical');

    // Hide/show mode switch 
    modeSwitchVerticalButton.classList.toggle('visible', isFun);
    modeSwitchVerticalButton.classList.toggle('vertical-nav', currentSlideMode === 'vertical');
    modeSwitchVerticalButton.classList.toggle('horizontal-nav', currentSlideMode !== 'vertical');


    if(currentSlideMode === 'vertical'){
        scrollUpButton.disabled = index === 0;
        scrollDownButton.disabled = index === slides.length - 1;

        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        scrollUpButton.style.display = ''; 
        scrollDownButton.style.display = ''; 
        modeSwitchVerticalButton.style.display = 'none'; 
    } else { 
        prevButton.disabled = index === 0;
        nextButton.disabled = index === slides.length -1;
        scrollUpButton.style.display = 'none';
        scrollDownButton.style.display = 'none';
        prevButton.style.display = ''; 
        nextButton.style.display = ''; 
        modeSwitchVerticalButton.style.display =  (currentSlideMode === 'fun') ? '' : 'none';  ;  
    }
}

function updateFixedButtonColors() {
    const isOverlayVisible = slidesOverlay.classList.contains('visible');
    const isFunMode = slidesOverlay.classList.contains('fun-mode');

    const fixedButtons = [emailButton, instagramButton, creditsButton];

    if (isOverlayVisible && isFunMode) {
        // 
        let activeSlide;
        if (currentSlideMode === 'vertical') {
            activeSlide = document.querySelector(`.vertical-slides .slide-item.active`);
        } else if (currentSlideMode === 'fun') {
            activeSlide = document.querySelector(`.fun-slides .slide-item.active`);
        } else {
            // if none, just default color
            fixedButtons.forEach(button => {
                button.style.color = 'var(--accent-color)'; 
            });
            return;
        }
        // check active slide then get the correct the correct class
        if (activeSlide) {
            let titleElement;
            if (currentSlideMode === 'vertical') {
                titleElement = activeSlide.querySelector('.title-vertical');
            } else if (currentSlideMode === 'fun') {
                titleElement = activeSlide.querySelector('.title-slide');
            }

            if (titleElement) {
                // if all is well, get the color from the class
                const titleColor = getComputedStyle(titleElement).color;

                // apply this color
                fixedButtons.forEach(button => {
                    button.style.color = titleColor;
                });
            } else {
                // return to normal if nothing is found
                fixedButtons.forEach(button => {
                    button.style.color = 'var(--accent-color)'; 
                });
            }
        } else {
            // just fun color when no active slide
            fixedButtons.forEach(button => {
                button.style.color = 'var(--fun-color)'; 
            });
        }
    } else {
        // default color if not on overlay
        fixedButtons.forEach(button => {
            button.style.color = 'var(--accent-color)';
        });
    }
}


funButton.addEventListener('click',() =>{
    toggleFunModeClasses();
    if (slidesOverlay.classList.contains('visible') && currentSlideMode !== 'vertical') {
        currentSlideMode = funButton.classList.contains('active') ? 'fun' : 'horizontal';
        openSlides(currentSlideMode);
    }
    updateFixedButtonColors();
  
})
exploreButton.addEventListener('click', () => {
    // remove fun mode just in case
    mainName.classList.remove('fun-mode-active');
    funButton.classList.remove('fun-mode-active');
    starButton.classList.remove('fun-mode-active');
    closeOverlayButton.classList.remove('fun-mode-active');
    openSlides('horizontal');
});

starButton.addEventListener('click', () => {
    // same thing but for opposite reason
    mainName.classList.add('fun-mode-active');
    funButton.classList.add('fun-mode-active');
    starButton.classList.add('fun-mode-active');
    closeOverlayButton.classList.add('fun-mode-active');
    openSlides('fun');
});

closeOverlayButton.addEventListener('click', () => {
    slidesOverlay.classList.remove('visible');
    slidesOverlay.classList.remove('fun-mode', 'vertical-mode'); //general clean-up, will see if removing the fun is what i want or not
    prevButton.style.display = 'none'; // hide ALL buttons, again, just in case
    nextButton.style.display = 'none';
    scrollUpButton.style.display = 'none';
    scrollDownButton.style.display = 'none';
    modeSwitchVerticalButton.style.display = 'none';
    updateFixedButtonColors();
});

prevButton.addEventListener('click', () => moveSlide(-1));
nextButton.addEventListener('click', () => moveSlide(1));

modeSwitchVerticalButton.addEventListener('click', () => {
    const funSlides = document.querySelectorAll('.fun-slides .slide-item');
    if (funSlides.length > index) {
        const activeFunSlide = funSlides[index];
        const category = activeFunSlide.dataset.slideId;
        openSlides('vertical', category);
    }
});

scrollUpButton.addEventListener('click', () => moveSlide(-1));
scrollDownButton.addEventListener('click', () => moveSlide(1));

