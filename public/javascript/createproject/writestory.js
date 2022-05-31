 // variable initializer
 let arr = []; // to catch the selected word for bold 
 let image_file_name = [];
 let Title = "";
 let story = "";

 // getting reuired id or catch elements
 const create_link = document.getElementById("link");
 const titleOftheStory = document.getElementById("title");
 const text_bold = document.getElementById("bold"); // for Bolding text
 const file_input = document.getElementById("file-input"); // for selecting multiple files like .jpeg .jpg .png
 const content = document.getElementById("content"); // story div

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

  //  console.log(image_file_name) 

}






/* Live character count for title */

function charCount(obj)
{
  let  maxLength = 60;
  let currLength = obj.value.length;
  document.getElementById("charnum").innerHTML = currLength + "/"+maxLength;
  
  if(currLength > maxLength)
  {
    document.getElementById("charnum").innerHTML =`<span style="color: red;"> ${currLength} out of  ${maxLength}  characters</span>`
    document.getElementById("next").style.display = "none";
  }else{

    document.getElementById("charnum").innerHTML = currLength + "/"+maxLength;
    document.getElementById("next").style.display = "block";
  }
  
}


function charDecrease(obj)
{
  let maxLength = 5000;
  let currLength = obj.value.length;
  let presentLength = (maxLength - currLength);
  document.getElementById("storychar").innerHTML = presentLength;
 
  if( presentLength < 0 )
  {
    document.getElementById("storychar").style.innerHTML = `<span style="color : red">${currLength} out of ${maxLength} characters</span>`
    document.getElementById("next").style.display = "none";
  }else{

    document.getElementById("storychar").innerHTML = presentLength ;
    document.getElementById("next").style.display = "block";
  }
}



