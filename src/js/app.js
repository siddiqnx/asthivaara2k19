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
    } 
    else if(!isAtTheTop) {
      headerLogo.classList.add('show');
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