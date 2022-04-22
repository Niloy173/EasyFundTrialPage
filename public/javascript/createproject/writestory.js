 // variable initializer
 var img;
 let arr = []; // to catch the selected word for bold 
 var image_file_name = [];
 let Title = "";
 let story = "";

 // getting reuired id or catch elements
 const create_link = document.getElementById("link");
 const titleOftheStory = document.getElementById("title");
 const text_bold = document.getElementById("bold"); // for Bolding text
 const file_input = document.getElementById("file-input"); // for selecting multiple files like .jpeg .jpg .png
 const content = document.getElementById("content"); // story div

 
 // default text
 content.innerHTML = "write your story"

 //inital localstorage
 localStorage.setItem("Story","");


 document.getElementById("next").addEventListener("click",function(){

  localStorage.setItem("Story",content.innerHTML);
 })

 



// catching the selected word or sentence for later use such as Bold
document.addEventListener("selectionchange",function(){

   if(document.getSelection().toString())
   {
     arr.push(document.getSelection().toString())

     
   }
 });


 // Bold the selected text
 text_bold.addEventListener("click",function(){

      let highlight = arr[arr.length-1]
      let span = '<span class="bold">' + highlight + '</span>';
      let text = content.innerHTML;


        if(highlight !="")
        {
          content.innerHTML = text.replace(highlight,span);
       
        }

     

    });


    
    

// take the image from the image and add them in the container
function preview()
{

  // console.log(file_input.files.length)
 

  for(let i of file_input.files)
  {
    let reader = new FileReader();
    let figure = document.createElement('figure');
    

    reader.onload =()=>{

      let img = document.createElement("img");
      img.setAttribute("src",reader.result);
      img.className = "uploaded_img";
      img.onclick = function(){

        // just for the test purpose
        if(confirm("Do you want to remove it"))
        {
            this.remove();
            
        }else{

        }
      }
      
      figure.appendChild(img)
    }

    image_file_name.push(i.name);
    // image_container.appendChild(figure)
    content.insertAdjacentElement("beforeend",figure)
    reader.readAsDataURL(i);

    
  }

  // console.log(image_file_name) 

}






