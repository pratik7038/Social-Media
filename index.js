const express = require("express")

const app = express();

const port = 8000;


const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
const path = require("path")

app.use(express.static('./assets'))

const db = require("./config/mongoose");

const expressLayouts = require("express-ejs-layouts")

app.use(expressLayouts);


//// extract styles into the header of the layouts
app.set("layout extractStyles",true)
app.set("layout extractScripts",true);


app.set('view engine','ejs');
app.set('views','./views')


app.use('/',require("./routes"))






app.listen(port,(err)=>{if(err)console.log(err);else console.log("server is up on the port : ",port)});