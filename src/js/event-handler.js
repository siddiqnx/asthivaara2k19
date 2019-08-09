
const eventCards = document.querySelectorAll('.events:not(.events--all) .event-card');
const eventsGrids = document.querySelectorAll('.events-grid');
const eventCardCarousels = document.querySelectorAll('.carousel-wrapper');
const closeButton = document.querySelector('.close-button');
const eventSectionHeadings = document.querySelectorAll('.heading');
const header = document.querySelector('.header');

var observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(!entry.target.getBoundingClientRect().y) {
      header.style.boxShadow = 'none';
    } else {

      header.style.boxShadow = 'black 0px 0px 5rem';
    }
  });
});

observer.observe(document.querySelector('.sentinel'));

eventCards.forEach((eventCard, i) => {

});

closeButton.addEventListener('click', (e) => {

});