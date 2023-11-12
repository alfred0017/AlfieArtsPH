// navigation panel
var sidemenu = document.getElementById("sidenav");

function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

//scroll

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-90px";
  }
  prevScrollpos = currentScrollPos;
};

//for the navbar 
document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById("navbar");
  var homeSection = document.getElementById("home");

  window.addEventListener("scroll", function () {
      if (window.scrollY > homeSection.offsetTop) {
          navbar.classList.add("fixed-navbar");
      } else {
          navbar.classList.remove("fixed-navbar");
      }
  });
});