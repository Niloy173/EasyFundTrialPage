// variable initializer


// click able element through id or classname
const img_input = document.getElementById("file");
const reader = new FileReader();
   





  img_input.addEventListener('change',function(){


    
    

    if(this.files && this.files[0])
    {
      
      var img = document.querySelector('#display_img');

      reader.addEventListener("load",()=>{


        img.setAttribute("src",reader.result);
        
        
      });

      

      reader.readAsDataURL(this.files[0]);
      cover_image = this.files[0].name;


      // img.src = URL.createObjectURL(this.files[0]);
      
    }
 
  });





function Previous()
{
  location.href = "#";
   
}

