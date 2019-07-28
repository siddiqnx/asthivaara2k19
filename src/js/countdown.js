function prezero(n){
  return n > 9 ? "" + n: "0" + n;
}
var deadline = new Date("Aug 20, 2019 15:37:25").getTime(); 
setInterval(function() { 
  var now = new Date().getTime(); 
  var t = deadline - now; 
  var days = prezero(Math.floor(t / (1000 * 60 * 60 * 24)));
  var hours = prezero(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))); 
  var minutes = prezero(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))); 
  var seconds = prezero(Math.floor((t % (1000 * 60)) / 1000));
  document.getElementsByClassName("hero__countdown")[0].innerHTML = '<span class="countdown_item"><span class="countdown_num">' + days + '</span><span class="countdown_unit"> Days </span></span>'  
  + '<span class="countdown_item"><span class="countdown_num">' + hours + '</span><span class="countdown_unit"> Hours </span></span>' + '<span class="countdown_item"><span class="countdown_num">' + minutes + '</span><span class="countdown_unit"> Minutes </span></span>' + '<span class="countdown_item"><span class="countdown_num">' + seconds + '</span><span class="countdown_unit"> Seconds </span></span>'; 
  if (t < 0) { 
      clearInterval(x); 
      document.getElementById("countdown").innerHTML = "Event Started!"; 
  } 
}, 1000);
