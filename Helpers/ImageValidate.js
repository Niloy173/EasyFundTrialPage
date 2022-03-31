
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const UPLAOD_FOLDER = path.join(__dirname+"/../"+'/Picture/')

let filename;


function check()
{
  fs.readdir(UPLAOD_FOLDER, (err, files,cb) => {
    if (err) cb(new Error("Folder Error "))
  
    for (const file of files) {
      fs.unlink(path.join(UPLAOD_FOLDER, file), (err,cb) => {
        if (err) cb(new Error("File Error "))
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

    fileSize : 5000000,
  },
  fileFilter : (req,file,cb) =>{


    if(file.mimetype === "image/png" || file.mimetype === "image/jpg"
    || file.mimetype === "image/jpeg")
    {

      cb(null,true);

    }else{

      cb(new Error("Only .png/jpg/jpeg format allowed"))
    }

    
    // console.log(file);

  },

})




module.exports = {

  upload,


  
}