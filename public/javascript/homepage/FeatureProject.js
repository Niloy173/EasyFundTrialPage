/* this file is test purpose */




/*

  what we want here is to add all the medical story indiviuals in the same page
  we are collecting there caption , image , Raising Amount From the database
  or using dynamic programming

*/


let SelectedCardCoverImage = `./img/homepage/demo1.jpg`;
let SelectedCardSubject = ` Help Us To Raise This Child With Eductaion and Care By Giving a Small
Contribution.`;
let Category = `Medical`; // for example
let RaisedAmount = 230; // for example


function createElement(tag,className)
{
  let obj = document.createElement(tag);
  obj.className = className;
  return obj;
}

let parentDivMedical = document.getElementById("card-list")



for(let i=0;i<9;i++)
{

  let childContainer = createElement("div","card-container");
      // image section
    let image = createElement("img","card-cover-img");
    image.src = SelectedCardCoverImage;
    image.alt = "Sample";

    // subject section
    let subject = createElement("p","subject");
    subject.innerHTML = SelectedCardSubject;
    subject.style.padding = "10px 10px";

    // another div which contains category and category name both
    let categoryDiv = createElement("div","category");
    categoryDiv.style.display = "flex";
    categoryDiv.style.paddingBottom = "10px";

    let categoryIcon = createElement("span","material-icons");
    categoryIcon.innerHTML = "category";
    categoryIcon.style.paddingLeft = "10px";

    let categoryType = createElement("label","CtypeName");
    categoryType.innerHTML = Category;
    categoryType.style.padding = "0px 10px";


    categoryDiv.appendChild(categoryIcon);
    categoryDiv.appendChild(categoryType);


    // Amount section

    let amountDiv = createElement("p","amount_section");
    amountDiv.innerHTML = `Raised Amount :   $${RaisedAmount}`;

    childContainer.appendChild(image);
    childContainer.appendChild(subject);
    childContainer.appendChild(categoryDiv);
    childContainer.appendChild(amountDiv);

    
    // DEMO PURPOSE
          childContainer.onclick = function()
        {
          // location.href = "./UserEnd/userstorypage.html";
        }
    

    parentDivMedical.append(childContainer);
}
