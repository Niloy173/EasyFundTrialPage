//variable initializer
var cover_image;


// click able element through id or classname
const img_input = document.getElementById("file");
const next_page = document.getElementById("next_page");
   


window.addEventListener('load',function(){


  img_input.addEventListener('change',function(){

    

    if(this.files && this.files[0])
    {
      var img = document.querySelector('#display_img');

      img.onload = () =>{

        URL.revokeObjectURL(img.src);
      }

      cover_image = this.files[0].name;

      img.src = URL.createObjectURL(this.files[0]);
      
    }
 
  });

});



next_page.addEventListener("click",function(){

   if(cover_image === undefined)
   {
     alert("Image is not selected");
   }else{

    alert("Selected Image : "+cover_image);
   }
})