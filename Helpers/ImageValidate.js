
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const UPLAOD_FOLDER = path.join(__dirname+"/../"+'/public/Image/Picture/')



function check()
{
  fs.readdir(UPLAOD_FOLDER, (err, files) => {
   
  
    for (const file of files) {
      fs.unlink(path.join(UPLAOD_FOLDER, file), (err,cb) => {
        if (err) cb(new Error("File Error ")) // Not efficient
      });
    }
  });
}

// define the storage

let storage = multer.diskStorage({

  destination : (req,file,cb)=>{

    check()
    cb(null,UPLAOD_FOLDER);

  },

  filename :(req,file,cb)=>{

    
    let file_ext = path.extname(file.originalname);
     filename = file.originalname
                      .replace(file_ext,"")
                      .split(' ')
                      .join('-')
                      .toLowerCase() + Date.now() +file_ext

    cb(null,filename);
  }

  


})

// prepare the final multer upload object
var upload = multer({

  storage : storage,
  limits : {

    fileSize : 5000000, // size may vary
  },
  fileFilter : (req,file,cb) =>{


    if(file.mimetype === "image/png" || file.mimetype === "image/jpg"
    || file.mimetype === "image/jpeg")
    {

      cb(null,true); // unnecessary check

    }else{

      cb(new Error("Only .png/jpg/jpeg format allowed")); // temporaray because we have already handle this in html accept tag
    }

    
    // console.log(file);

  },

})



module.exports = {

  upload,
  check,
  
}