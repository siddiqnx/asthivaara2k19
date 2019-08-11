const closeButton = document.querySelector('.close-button');
const header = document.querySelector('.header');
const cardTemplate = document.querySelector('#card-template');
const carouselTemplate = document.querySelector('#carousel-template');
const wrapper = document.querySelector('.wrapper');
import data from '../events.json'
import Glide from '@glidejs/glide';

<<<<<<< HEAD
var cardLayout;
var modalWidth;
var modalHeight;
var top;
var cardStyle;
var scrollYPos;
=======
window.onload = function() {
  header.style.boxShadow = 'none';
  closeButton.classList.add('vanish');
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
  document.querySelectorAll('.carousel__button').forEach((button) => {
    button.style.display = 'none';
    button.classList.add('vanish');
  })
};
>>>>>>> master

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

<<<<<<< HEAD
function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; 
  outer.style.msOverflowStyle = 'scrollbar'; 
  document.body.appendChild(outer);
  const inner = document.createElement('div');
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

function renderCarousel(modal, n) {
  const carouselNode = document.importNode(carouselTemplate.content, true);
  const carousel = carouselNode.querySelector('.glide');
  modal.appendChild(carousel);
  console.log(n); 
  const modalImages = data[n-1].url;
  const imageEl = document.createElement('img');
  modalImages.forEach((image, i) => {
    imageEl.src = `${image}`
    carousel.querySelectorAll('.glide__slide')[i].appendChild(imageEl.cloneNode(true));
  })
  console.log(carousel.querySelectorAll('.glide__slide img'))
  var glide = new Glide('.glide', {
    focusAt: 'center',
    type: 'carousel'
  });
  
  glide.mount();
}

function renderModal(e) {
  if (e.target.closest('.events:not(.events--all) .event-card')) {
    if(!e.target.closest('.event-card').classList.contains('expanded')) {
      const card = e.target.closest('.event-card');
      cardStyle = window.getComputedStyle(card);
      cardLayout = card.getBoundingClientRect();
      const cardTitle = card.querySelector('.event-card__title');
      const modal = document.importNode(cardTemplate.content, true).querySelector('.event-card');
      cardStyle = window.getComputedStyle(card);
      modalWidth = card.getBoundingClientRect().width;
      modalHeight = card.getBoundingClientRect().height;
      const modalTitle = modal.querySelector('.event-card__title');
      top = cardLayout.y;
      wrapper.style.cssText = `
        width: calc(100vw - ${getScrollbarWidth()}px);
      `;
      closeButton.removeAttribute('hidden');
      scrollYPos = document.documentElement.scrollTop;
      header.style.transform = `translateY(${scrollYPos}px)`
      document.body.style.top = `-${document.documentElement.scrollTop}px`;
      document.body.style.position = 'fixed';
      document.body.style.overflowY = 'scroll';
      modal.style.cssText = `
        position: fixed;
        top: ${top}px;
        left: ${cardLayout.x}px;
        z-index: 9999;
        border-bottom: ${cardStyle.borderBottomWidth} ${cardStyle.borderBottomStyle} ${cardStyle.borderBottomColor};
        transition: all .4s linear;
      `;

      modalTitle.innerText = cardTitle.innerText;
      modalTitle.style.cssText = `
        color: transparent;
        background-image: ${window.getComputedStyle(cardTitle).backgroundImage};
        -webkit-background-clip: text;
        background-clip: text;
        opacity: 1;
      `;
      document.body.insertBefore(modal, document.body.children[1]);
      modal.classList.add('expanded');
      setTimeout(() => {
        modal.style.cssText = `
          position: fixed;
          top: 0px;
          left: 0px;
          bottom: 0px;
          right: 0px;
          z-index: 9999;
          width: calc(100vw - ${getScrollbarWidth()}px);
          height: 100vh;
          user-select: none;
          border-bottom: ${cardStyle.borderBottomWidth} ${cardStyle.borderBottomStyle} ${cardStyle.borderBottomColor};
          transition: all .4s linear;
        `;
        modalTitle.style.cssText = `
          opacity: 0;
          transition: opacity .4s;
        `;
        
      }, 0)
      setTimeout(() => {
        modalTitle.setAttribute('hidden', '');
        renderCarousel(modal, card.dataset.cardId);
      }, 500);
=======
  eventCard.addEventListener('click', (e) => {
    
    const eventCard = e.target.closest('.event-card');
    const eventCardTitle = eventCard.querySelector('.event-card__title');
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
    eventCard.style.width = '';
    eventCard.style.height = '';
    notClearElements.forEach((element) => {
      element.classList.add('clear');
    })
    eventCardTitle.classList.remove('appear');
    eventCardTitle.classList.add('vanish');
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
    document.querySelector('.events-grid.expanded').style.transform = `translateY(${window.scrollY}px)`;
      
    eventSectionHeadings.forEach((heading) => {
      heading.classList.remove('appear');
      heading.classList.add('vanish');
    })
    eventCardCarousel.classList.add('hide');
    eventCardCarousel.classList.remove('vanish');
    eventCardCarousel.classList.add('appear');
    eventCardCarousel.removeAttribute('data-hidden');
    eventCardCarousel.style.pointerEvents = 'all';
    document.querySelectorAll('.carousel__button').forEach((button) => {
      button.style.display = 'block';
    })
    if(closeButton.classList.contains('vanish')) {
      setTimeout(() => {
      closeButton.removeAttribute('hidden');
      closeButton.classList.remove('vanish');
      closeButton.classList.add('appear');
      document.querySelectorAll('.carousel__button').forEach((button) => {
        button.removeAttribute('hidden');
        button.classList.remove('vanish');
        button.classList.add('appear');
      })
      },700);
>>>>>>> master
    }
  }
}

document.addEventListener('click', renderModal);

closeButton.addEventListener('click', (e) => {
<<<<<<< HEAD
  closeButton.setAttribute('hidden', '');
  const openModal = document.querySelector('.expanded');
  openModal.classList.remove('expanded');
  header.style.transform = '';
  openModal.style.cssText = `
    position: fixed;
    top: ${window.scrollY}px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    border-bottom: ${cardStyle.borderBottomWidth} ${cardStyle.borderBottomStyle} ${cardStyle.borderBottomColor};
    transition: all .4s linear;
  `;
  setTimeout(() => {
    openModal.style.cssText = `
      position: fixed;
      top: ${top}px;
      left: ${cardLayout.x}px;
      bottom: 0px;
      right: 0px;
      z-index: 9999;
      width: ${modalWidth};
      height: ${modalHeight};
      border-bottom: ${cardStyle.borderBottomWidth} ${cardStyle.borderBottomStyle} ${cardStyle.borderBottomColor};
      transition: all .4s linear;
    `;

    document.querySelector('.glide').style.cssText = `
      transform: scale(.2);
      opacity: 0;
    `;
  }, 0);
  document.body.style.position = 'static';
  window.scrollTo(0, scrollYPos);
  setTimeout(() => {
    openModal.parentElement.removeChild(openModal);
  }, 350);
});
  
=======
  const eventCard = document.querySelector('.event-card.expanded');
  const eventCardTitle = eventCard.querySelector('.event-card__title');
  const eventGrid = eventCard.parentNode;
  const eventGridId = eventGrid.dataset.id;
  const clearElements = document.querySelectorAll('.clear');
  const eventCardCarousel = eventCard.querySelector('.carousel-wrapper');
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';  
  eventGrid.style.position = 'relative';
  eventCardCarousel.style.pointerEvents = 'none';
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
  eventCardTitle.classList.remove('vanish');
  eventCardTitle.classList.add('appear');
  eventCardCarousel.classList.remove('hide');
  eventCardCarousel.classList.remove('appear');
  eventCardCarousel.classList.add('vanish');
  closeButton.classList.remove('appear');
  closeButton.classList.add('vanish');
  closeButton.dataset.hidden = 'true';
  document.querySelectorAll('.carousel__button').forEach((button) => {
    button.classList.remove('appear');
    button.classList.add('vanish');
  })
});
>>>>>>> master
