/* all the package goes here */
const express = require('express');
const path = require('path');

/*---------------------------*/
require("dotenv").config();


const app = express();
app.use(express.json());

/* database connection */
require("./db/connection");

/* variable section */
const staticPath = path.join(__dirname,"/public/");
const templatePath = path.join(__dirname,"/templates/views/");
const port_number = process.env.PORT || 5000; // process.env working through .env file
/*--------------------------*/


/* all route require object goes here */
const homeRoute = require("./routes/home.route");
const registerRoute = require("./routes/register.route");
const loginRoute= require("./routes/login.route");
const protectedRoute= require("./routes/protected.route");
const resetPasswordRoute = require("./routes/resetPassword.route")
/*---------------*/


/* middleware */
app.enable('case sensitive routing');
app.use(express.static(staticPath));
app.use("/article",express.static(`${__dirname}`+"/public/article/")); 
app.use("/css",express.static(`${__dirname}`+"/public/css/"));
app.use("/img",express.static(`${__dirname}`+"/public/images/"));
app.use("/js",express.static(`${__dirname}`+"/public/js/"));


// for an exmaple if you want to include a css/js/image file in any particular
// ejs file then just use /css/ or /js or /img and then folder/file name ..........
// don't need to use "../../public/css" like we did before
/*-----------*/


/* view engine set up */
app.set("view engine","ejs");
app.set("views",templatePath);
/*---------*/



/* project related routes */
app.use("/",homeRoute.router); // localhost : 3000/ => it will fetch from home.route.js and execute home.ejs
app.use("/register",registerRoute.router);
app.use("/login",loginRoute.router);
app.use("/resetpassword",resetPasswordRoute.router);
app.use("/protected",protectedRoute.router);

/*-----------------*/


/* to distroy cookie */
app.get("/logout",(req,res)=>{

    res.clearCookie("easyfund");
    res.redirect("/");
})


app.listen(port_number,()=>{

    console.log(`Server is listening to ${port_number}`);
})
