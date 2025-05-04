
function copyEmail() {
    const email = document.getElementById("business-email").textContent;
    navigator.clipboard.writeText(email).then(() => {
        // alert("Email copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
}

let currentIndex = 0;

function slideLeft() {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + 20; // Include margin

    // Calculate the expected scroll position
    const expectedScrollLeft = (currentIndex - 1) * cardWidth;

    // Check if the carousel can scroll further
    if (currentIndex > 0) {
        const currentScrollLeft = carousel.scrollLeft;
        const scrollDifference = Math.abs(expectedScrollLeft - currentScrollLeft);

        // If the scroll difference is small, skip to the previous-previous card
        if (scrollDifference < cardWidth / 2) {
            currentIndex = Math.max(currentIndex - 2, 0); // Decrement index by 2
        } else {
            currentIndex = Math.max(currentIndex - 1, 0); // Decrement index by 1
        }

        carousel.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }
}

function slideRight() {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + 20; // Include margin
    const maxIndex = cards.length - 1; // Prevent scrolling past the last card

    // Calculate the expected scroll position
    const expectedScrollLeft = (currentIndex + 1) * cardWidth;

    // Check if the carousel can scroll further
    if (currentIndex < maxIndex) {
        const currentScrollLeft = carousel.scrollLeft;
        const scrollDifference = Math.abs(expectedScrollLeft - currentScrollLeft);

        // If the scroll difference is small, skip to the next-next card
        if (scrollDifference < cardWidth / 2) {
            currentIndex = Math.min(currentIndex + 2, maxIndex); // Increment index by 2
        } else {
            currentIndex = Math.min(currentIndex + 1, maxIndex); // Increment index by 1
        }

        carousel.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }
}

let scrollSpeed = 1.7; // Normal scroll speed
let isScrolling = false;

window.addEventListener("wheel", function (event) {
    event.preventDefault();

    let currentScroll = window.scrollY; // Get current scroll position
    let adjustedSpeed = scrollSpeed;

    // If user is near the top (less than 50px), reduce first scroll impact
    if (currentScroll < 70) {
        adjustedSpeed = 0.5; // Reduce the first scroll effect
    }

    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
            window.scrollBy({
                top: event.deltaY * adjustedSpeed,
                behavior: "smooth"
            });
            isScrolling = false;
        });
    }
}, { passive: false });

// Enable touch-based scrolling for the carousel
const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
carousel.addEventListener('touchmove', handleTouchMove, { passive: true });

let xStart = null;

function handleTouchStart(event) {
    xStart = event.touches[0].clientX;
}

function handleTouchMove(event) {
    if (!xStart) return;

    const xEnd = event.touches[0].clientX;
    const xDiff = xStart - xEnd;

    carousel.scrollLeft += xDiff; // Scroll horizontally based on touch movement
    xStart = xEnd; // Update the starting position
}
