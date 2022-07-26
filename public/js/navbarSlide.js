let nav_menu_item = document.getElementById("nav_menu_item");
let show_nav = document.getElementById("show_nav");

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
