const closeButton = document.querySelector('.close-button');
const header = document.querySelector('.header');
const cardTemplate = document.querySelector('#card-template');
const carouselTemplate = document.querySelector('#carousel-template');
const wrapper = document.querySelector('.wrapper');
import data from '../events.json'
import Glide from '@glidejs/glide';

var cardLayout;
var modalWidth;
var modalHeight;
var top;
var cardStyle;
var scrollYPos;

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
      }, 550);
    }
  }
}

document.addEventListener('click', renderModal);

closeButton.addEventListener('click', (e) => {
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
  
