function slider({selTape, selSlides, selButtonNext, selButtonPrev, selZeroSlide, 
    direction = "vertical", leafedSlide = 1, activeClass = "card-active", autoSwitching = false, }) {
    const tape = document.querySelector(selTape);
    const slides = document.querySelectorAll(selSlides);
    const buttonsNext = document.querySelectorAll(selButtonNext);
    const buttonPrev = document.querySelectorAll(selButtonPrev);
    const logo = document.querySelectorAll(selZeroSlide);


    let currentSlide = 0;
    let maxCurrentSlide = slides.length - 1;
    let biasTape = 0;
    let heightSlide = 0;
    let widthSlide = 0;
    let auto;

    if (autoSwitching) {
        auto = setInterval(() => {
            switching(leafedSlide);
        }, 5000);

        tape.addEventListener('mouseover', () => {
            clearInterval(auto);
        });
        tape.addEventListener('mouseout', () => {
            auto = setInterval(() => {
                switching(leafedSlide);
            }, 5000);
        });
    }

    checkDirection(() => {
        heightSlide = window.getComputedStyle(slides[0]).height.match(/\d|\./g).join("");
    }, () => {
        const margin = +window.getComputedStyle(slides[0]).marginRight.match(/\d|\./g).join("");
        const width = +window.getComputedStyle(slides[currentSlide + 1 == slides.length ? 0 : currentSlide + 1]).width.match(/\d|\./g).join("");
        widthSlide = margin + width;
    });

    function switching(n) {
        const maxBiasTape = (heightSlide || widthSlide) * maxCurrentSlide;
        currentSlide += n;
        biasTape = (heightSlide || widthSlide) * currentSlide;

        
        if (currentSlide > maxCurrentSlide || n == 0) {
            currentSlide = 0;
            biasTape = 0;
        }
        if (currentSlide < 0) {
            currentSlide = maxCurrentSlide;
            biasTape = maxBiasTape;
        }

        slides.forEach(s => s.style.height = "");
        if (direction == "vertical" && document.URL.includes('modules')) {
            slides[currentSlide].style.height = "100vh";
        }

        checkDirection(() => {
            tape.style.transform = `translateY(-${biasTape}px)`;
        }, () => {
            tape.style.transform = `translateX(-${biasTape}px)`;
            slides.forEach(slide => slide.classList.remove(activeClass));
            slides[currentSlide].classList.add(activeClass);
        });
    }

    try {
        buttonsNext.forEach(button => {
            button.addEventListener('click', () => {
                switching(leafedSlide);
                clearInterval(auto);
            });
        });
    } catch (error) {}
    try {
        buttonPrev.forEach(button => {
            button.addEventListener('click', () => {
                switching(-leafedSlide);
                clearInterval(auto);
            });
        });
    } catch (error) {}
    try {
        logo.forEach(item => {
            item.addEventListener('click', () => {
                switching(0);
            });
        });
    } catch (error) {}

    if (currentSlide == 2 && tape.classList.contains("page")) {
        slides[0].style.height = "100vh";
    }

    function checkDirection(funVertical, funHorizontal) {
        if (direction == "vertical") {
            funVertical();
        } else if (direction == "horizontal") {
            funHorizontal();
        } 
    }
}
slider({
    selTape:".tape", 
    selSlides: ".card", 
    selButtonNext: ".slick-next", 
    selButtonPrev: ".slick-prev", 
    direction: "horizontal",
    autoSwitching: true
});