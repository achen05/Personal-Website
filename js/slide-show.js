let slideIndex = 0;
showSlides();

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Loop back to first slide
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1; // Loop to last slide
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }

    slides[slideIndex].style.display = "flex"; // Show current slide

    // Update slide number
    const slideNumberElement = document.getElementById("slide-number");
    slideNumberElement.innerHTML = `${slideIndex + 1} / ${slides.length}`;
}