import 'intersection-observer';

const header = document.querySelector('.header');
const headerLogo = document.querySelector('.header__logo');
const internalLinks = document.querySelectorAll('a[href^="#"]');
<<<<<<< HEAD
=======
let isAtTheTop = true;
document.onload = function() {
  if(headerLogo.classList.contains('home')) {
    isAtTheTop = window.scrollY ? false : true; 
  }
}
>>>>>>> master

var observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (headerLogo.classList.contains('home') && !entry.target.getBoundingClientRect().y) {
      header.style.boxShadow = 'none';
      headerLogo.classList.remove('show');
      headerLogo.classList.add('hide');
    } else if (headerLogo.classList.contains('home')) {
      headerLogo.classList.remove('hide');
      headerLogo.classList.add('show');
      header.style.boxShadow = 'black 0px 0px 5rem';
    }
  });
});

observer.observe(document.querySelector('.sentinel'));
<<<<<<< HEAD

=======
>>>>>>> master

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
<<<<<<< HEAD
=======

>>>>>>> master
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');

        img.setAttribute('src', src);

        observer.disconnect();
      }
    });
  });

  io.observe(target)
};

targets.forEach(lazyLoad);