

// variable initializer 
let SLideInd = 0;
let timecount=0;
let i;

// getElementBy properties
let slides_img = document.getElementsByClassName("singleSlide");
let show_nav = document.getElementById("show_nav");
let nav_menu_item = document.getElementById('nav_menu_item');


//function calling

showSlide(); // for automactic image sliding 



function showSlide()
{
 
  
  // var dot_img = document.getElementsByClassName("dot");

  for(i=0;i<slides_img.length;i++)
  {
    slides_img[i].style.display = "none";
  }
  SLideInd +=1;
  if (SLideInd > slides_img.length) SLideInd = 1;

  // for(i=0;i<dot_img.length;i++)
  // {
  //   dot_img[i].className = dot_img[i].className.replace("active","");
  // }

  slides_img[SLideInd-1].style.display = "block";
  // dot_img[SLideInd-1].className += " active";
  setTimeout(showSlide,3000);
}


 //cross button => close the navbar
 function closeNav(){

  nav_menu_item.style.right ="-100%";
  timecount =2;

}


// temporary solution
// click to show the navbar or close the navbar by window reducing 
show_nav.addEventListener('click',function(e){

  timecount +=1;
  if(timecount %2==0)
  {
      nav_menu_item.style.right ="-100%";
      
  }else{
     nav_menu_item.style.right ="0";

      
  }
  console.log(timecount);
  

});

