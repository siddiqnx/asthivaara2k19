var cardWidth = 0;
var cardHeight = 0;
var gridWidth = [];
var gridHeight = [];
var eventSectionWidth = 0;
var eventSectionHeight = 0;
var cardTop;
var cardLeft;
var gridTop;
var gridLeft;
const eventCards = document.querySelectorAll('.events:not(.events--all) .event-card');
const eventsGrids = document.querySelectorAll('.events-grid');
const eventCardCarousels = document.querySelectorAll('.carousel-wrapper');
const closeButton = document.querySelector('.close-button img');
const eventSectionHeadings = document.querySelectorAll('.heading');

// Init: each card ->  set dataset id i
//                 ->  initalize cardWidth and cardHeight
//                 ->  set left & top to 0 (after 500ms)
//                 ->  set width and height to cardWidth & cardHeight (after     500ms)

// expand:
// if expanded -> contract
// clicked eventCard -> width: 100% height: 100% 
// else expand

window.onload = function() {
  
  eventCards.forEach((eventCard, i) => {
    eventCard.dataset.id = i;
    cardWidth = cardWidth == 0 ? window.getComputedStyle(eventCard).getPropertyValue('width') : cardWidth;
    cardHeight = cardHeight == 0 ? window.getComputedStyle(eventCard).getPropertyValue('height') : cardHeight;
    eventCard.style.cssText = `
    width: ${cardWidth};
    height: ${cardHeight};`;
  });
  eventsGrids.forEach((eventsGrid, i) => {
    eventsGrid.dataset.id = i;
    gridWidth[i] = window.getComputedStyle(eventsGrid).getPropertyValue('width');
    gridHeight[i] = window.getComputedStyle(eventsGrid).getPropertyValue('height');
    eventsGrid.style.cssText = `
    left: 0px;
    top: 0px;
    width: ${gridWidth[i]};
    height: ${gridHeight[i]};`;
  });
  closeButton.classList.add('vanish');
};

eventCards.forEach((eventCard) => {

  eventCard.addEventListener('click', (e) => {
    e.stopPropagation();
    const eventCard = e.target.nodeName === 'DIV' ? e.target : e.target.parentNode;
    const target = e.target;
    console.log(target);
    const eventGrid = eventCard.parentNode;
    const eventSection = eventGrid.parentNode;
    const eventCardId = eventCard.dataset.id;
    const clearElements = document.querySelectorAll('.clear');
    const eventCardCarousel = eventCard.querySelector('.carousel-wrapper');
    eventSectionWidth = eventSectionWidth == 0 ? window.getComputedStyle(eventSection).getPropertyValue('width') : eventSectionWidth;
    eventSectionHeight = eventSectionHeight == 0 ? window.getComputedStyle(eventSection).getPropertyValue('height') : eventSectionHeight;

    const notClearElements = document.querySelectorAll(`.event-card:not([data-id="${eventCardId}"])`);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    cardTop = eventCard.style.top;
    cardLeft = eventCard.style.left;
    gridLeft = eventGrid.style.left;
    gridTop = eventGrid.style.top;
    // eventGrid.style.width = '100%';
    eventCard.style.width = '';
    eventCard.style.height = '';
    notClearElements.forEach((element) => {
      element.classList.add('clear');
    })
    eventSection.style.height = eventSectionHeight;
    eventGrid.style.left = eventGrid.offsetLeft + 'px';
    eventGrid.style.top = eventGrid.offsetTop + 'px';
    eventGrid.style.position = 'absolute';
    eventCard.style.left = eventCard.offsetLeft + 'px';
    eventCard.style.top = eventCard.offsetTop + 'px';
    clearElements.forEach((clearElement) => {
      clearElement.removeAttribute('style');
    });
    eventGrid.style.height = '';
    eventGrid.classList.add('expanded');
    eventCard.classList.add('expanded');
    eventGrid.style.top = '0px';
    eventGrid.style.left = '0px';
    eventCard.style.top = '0px';
    eventCard.style.left = '0px';
    //setTimeout(() => {
      //document.querySelector('.event-card.expanded').style.transition = 'transform 1s';
      document.querySelector('.event-card.expanded').style.transform = `translateY(${window.scrollY}px)`;
    //}, 800);
    eventSectionHeadings.forEach((heading) => {
      heading.classList.remove('appear');
      heading.classList.add('vanish');
    })
    eventCardCarousel.classList.add('hide');
    eventCardCarousel.classList.remove('vanish');
    eventCardCarousel.classList.add('appear');
    eventCardCarousel.removeAttribute('data-hidden');
    setTimeout(() => {
      closeButton.classList.remove('vanish');
      closeButton.classList.add('appear');
    },700);
    
  });
});

closeButton.addEventListener('click', (e) => {
  const eventCard = document.querySelector('.event-card.expanded');
  console.log(eventCard);
  const target = e.target;
  console.log(target);
  const eventGrid = eventCard.parentNode;
  const eventGridId = eventGrid.dataset.id;
  const clearElements = document.querySelectorAll('.clear');
  const eventCardCarousel = eventCard.querySelector('.carousel-wrapper');
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';  
  eventGrid.style.position = 'relative';
  eventCard.style.cssText = `
    top: ${cardTop};
    left: ${cardLeft};
    width: ${cardWidth};
    height: ${cardHeight};
  `;
  eventGrid.style.cssText = `
    top: ${gridTop};
    left: ${gridLeft};
    width: ${gridWidth[eventGridId]};
  `;
  eventCard.classList.remove('expanded');
  eventGrid.classList.remove('expanded');
  clearElements.forEach((clearElement) => {
    clearElement.classList.remove('clear')  ;
  });
  eventSectionHeadings.forEach((heading) => {
    heading.classList.remove('vanish');
  })
  eventCardCarousel.classList.remove('hide');
  eventCardCarousel.classList.remove('appear');
  eventCardCarousel.classList.add('vanish');
  closeButton.classList.remove('appear');
  closeButton.classList.add('vanish');
});