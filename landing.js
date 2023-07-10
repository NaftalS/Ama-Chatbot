// JavaScript code for image slider and button grid

// Slider functionality
const sliderInner = document.querySelector('.slider-inner');
let currentIndex = 0;

function slideToIndex(index) {
  sliderInner.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % sliderInner.children.length;
  slideToIndex(currentIndex);
}

function previousSlide() {
  currentIndex = (currentIndex - 1 + sliderInner.children.length) % sliderInner.children.length;
  slideToIndex(currentIndex);
}

// Button grid functionality
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    console.log(`Button "${buttonText}" clicked!`);
  });
});
