 // variable initializer
 var img;
 let arr = []; // to catch the selected word for bold 
 var image_file_name = [];

 // getting reuired id or catch elements

 
 
 const create_link = document.getElementById("link");
 const text_bold = document.getElementById("bold"); // for Bolding text
 const file_input = document.getElementById("file-input"); // for selecting multiple files like .jpeg .jpg .png
 const content = document.getElementById("content"); // story div

 
 // default text
 content.innerHTML = "write your story"

 
 
// Based on the story we might get short or long one's we don't know
// it will help users to write as per their need
function grow_more(element)
{
  element.style.height = "500px";
 element.style.height = (element.scrollHeight)+"px";

}


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






  create_link.addEventListener("click",function(){

     


    })

    
    

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


