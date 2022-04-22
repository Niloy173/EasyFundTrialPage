// require packages
const express = require('express');

const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();




// static file set up goes here
const staticpath = path.join(__dirname,"/public/");

// view path goes here
const templatePath = path.join(__dirname,"/templates/views/");





// port Number
const port = process.env.PORT || 3000;






// import all the routes
const HomeRoute = require('./routes/index.route');
const discoverProject = require('./routes/discover.route');
const generalsettings = require('./routes/general.route');
const takingPicture = require('./routes/takePicture.route');
const writingStory = require('./routes/writeStory.route');
const previewStory = require('./routes/preview.route');
const loginRoute = require('./routes/login.route');
const userRoute = require('./routes/userend.route')
// const categoryRoute = require('./routes/category.route');


// import all types of category route here
const businessRoute = require('./routes/category/business.route');
const comunityRoute = require('./routes/category/community.route');
const disasterRoute = require('./routes/category/disaster.route');
const educationRoute = require('./routes/category/education.route');
const familyRoute = require('./routes/category/family.route');
const medicalRoute = require('./routes/category/medical.route');
const studyabraodRoute = require('./routes/category/studyabraod.route');
/*-----------------------------------------------------------*/





// middleware

app.enable('case sensitive routing');
app.use(express.static(staticpath));
app.use('/article',express.static(`${__dirname}`+'/public/Article/'));
app.use('/project',express.static(`${__dirname}`+'/public/Project/'));
app.use('/css',express.static(`${__dirname}`+'/public/Css/'));
app.use('/img',express.static(`${__dirname}`+'/public/Image/'));
app.use('/js',express.static(`${__dirname}`+'/public/javascript/'));
app.use('/boot',express.static(`${__dirname}`+'/node_modules/bootstrap/dist/css/'))
// app.use('/fontawesome',express.static(`${__dirname}`+'/node_modules/@fortawesome/fontawesome-free/css/'));




// view engine set up goes here
app.set("view engine","ejs");
app.set("views",templatePath);















/*  project related all route */
app.use('/',HomeRoute);
app.use('/Homepage',HomeRoute);
app.use('/login',loginRoute.router);
app.use('/userend',userRoute.router);
//  app.use('/category',categoryRoute);
app.use('/DiscoverProjects',discoverProject); 
app.use('/GeneralSettings',generalsettings.router);
app.use('/layouts/TakingPicture',takingPicture.router);
app.use('/layouts/WriteStory',writingStory.router);
app.use('/layouts/PreviewStory',previewStory);



/********************************** */



/*-- category related routes */

app.use('/category/business',businessRoute.router);
app.use('/category/medical',medicalRoute.router);
app.use('/category/community',comunityRoute.router);
app.use('/category/disaster',disasterRoute.router);
app.use('/category/study_abroad',studyabraodRoute.router);
app.use('/category/family',familyRoute.router);
app.use('/category/education',educationRoute.router);



/*-------------------*/




// app.get('/picture',(req,res)=>{

//   res.render("layouts/takePicture")
// })


/*---------log out ----------*/

app.get('/logout',(req,res)=>{

  res.clearCookie('session-token');
  res.redirect("/Homepage");
})
/*---------log out ----------*/






// listening a port number 3000 for the development purpose
app.listen(port,()=>{

  console.log(`listening on port number ${port}`);

})

