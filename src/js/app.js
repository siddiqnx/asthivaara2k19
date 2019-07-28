const header = document.querySelector(".header");
const headerLogo = document.querySelector(".header__logo");
let isAtTheTop = true;
document.onload = function() {
  console.log(windows.scrollY)
  if(headerLogo.classList.contains('home')) {
    isAtTheTop = window.scrollY ? false : true;    
  }
}

if(!headerLogo.classList.contains('home')) {
  headerLogo.classList.remove('hide');
}

if(headerLogo.classList.contains('home')) {
  console.log('home');
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