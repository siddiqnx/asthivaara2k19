const header = document.querySelector('.header');
const headerLogo = document.querySelector('.header__logo');
const internalLinks = document.querySelectorAll('a[href^="#"]');
let isAtTheTop = true;
document.onload = function() {
  if(headerLogo.classList.contains('home')) {
    isAtTheTop = window.scrollY ? false : true; 
  }
}

if(!headerLogo.classList.contains('home')) {
  headerLogo.classList.remove('hide');
}

if(headerLogo.classList.contains('home')) {
  window.addEventListener('scroll', () => {
    isAtTheTop = window.scrollY ? false : true;
    if(isAtTheTop) {
      headerLogo.classList.remove('show');
      headerLogo.classList.add('hide');
      header.style.boxShadow = 'none';
    } 
    else if(!isAtTheTop) {
      headerLogo.classList.add('show');
      header.style.boxShadow = 'black 0px 0px 5rem';
    }
  });
  
}

internalLinks.forEach((link) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const targets = document.querySelectorAll('img');

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');

        img.setAttribute('src', src);
        img.classList.add('fade');

        observer.disconnect();
      }
    });
  });

  io.observe(target)
};

targets.forEach(lazyLoad);