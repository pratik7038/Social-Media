const express = require("express")
const app = express(); 
const port = 8000;

const env = require("./config/environment")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
const path = require("path")

app.use(express.static(env.asset_path))

const db = require("./config/mongoose");

const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")

const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth2-strategy') 


const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');


///socket
const chatServer = require('http').Server(app)
const chatSocket = require('./config/chat_socket').chatSocket(chatServer)
chatServer.listen(5000)
console.log("Chat Server is listening on port 5000")

///setup the chat server to be used with socket.io

///falsh messages
const flash = require('connect-flash')

const customeMiddleware = require('./config/middleware')

///make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(expressLayouts);



//// extract styles into the header of the layouts
app.set("layout extractStyles",true)
app.set("layout extractScripts",true);


app.set('view engine','ejs');
app.set('views','./views')


////using sass middleware
app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'/scss'),
    dest:path.join(__dirname,env.asset_path,'/css'),
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
 

///mongo store is used to store the session cookie in the db
app.use(session({
    name:'codial',
    ///TODO -> change the secrete before deployment
    secret:env.session_cookie_key,
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:(1000 *60 *100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://localhost:27017/codial_development',
        autoRemove:"disabled"
    },function(err){
        console.log(err || "connect mongo setup ok");
    })
}))

app.use(passport.initialize());
app.use(passport.session()); 

app.use(passport.setAuthenticatedUser)

app.use(flash())
app.use(customeMiddleware.setFlash)

app.use('/',require("./routes"))

app.listen(port,(err)=>{if(err)console.log(err);else console.log("server is up on the port : ",port)});
 