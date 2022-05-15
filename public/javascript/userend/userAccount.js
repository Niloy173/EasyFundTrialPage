function charCount(obj)
{
  let max = 20;
  let currLength = obj.value.length;
  document.getElementById("message").innerHTML = currLength +"/"+max;

  if(currLength > max)
  {
    document.getElementById("message").innerHTML = `<span style="color : red"> ${currLength} out of ${max} character </span>`;
    document.getElementById("btn-save").style.display = "none";
  }else{

    document.getElementById("message").innerHTML = currLength +"/"+max;
    document.getElementById("btn-save").style.display = "block";
  }
}