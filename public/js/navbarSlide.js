let nav_menu_item = document.getElementById("nav_menu_item");
let show_nav = document.getElementById("show_nav");
let slides_img = document.getElementsByClassName("singleSlide");
let SLideInd = 0;
let timecount = 0;
let i;

show_nav.addEventListener("click", function (e) {
  timecount += 1;
  if (timecount % 2 == 0) {
    nav_menu_item.style.right = "-100%";
  } else {
    nav_menu_item.style.right = "0";
  }
  console.log(timecount);
});

function opennav() {
  document.getElementById("mySidenav").style.width = "260px";
  document.getElementById("mySidenav").style.right = "0";
}
function closeUserNav() {
  document.getElementById("mySidenav").style.right = "-260px";
}

showSlide(); // for automactic image sliding

function showSlide() {
  // var dot_img = document.getElementsByClassName("dot");

  for (i = 0; i < slides_img.length; i++) {
    slides_img[i].style.display = "none";
  }
  SLideInd += 1;
  if (SLideInd > slides_img.length) SLideInd = 1;

  // for(i=0;i<dot_img.length;i++)
  // {
  //   dot_img[i].className = dot_img[i].className.replace("active","");
  // }

  slides_img[SLideInd - 1].style.display = "block";
  // dot_img[SLideInd-1].className += " active";
  setTimeout(showSlide, 3000);
}
