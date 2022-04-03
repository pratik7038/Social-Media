const express = require("express")

const app = express();

const port = 8080;

const bodyParser = require("body-parser")
const path = require("path")

// app.use("view engine","ejs");
// app.use("views",path.join(__dirname,"views"));

app.set('view engine','ejs');
app.set('views','./views')


app.use('/',require("./routes"))






app.listen(port,(err)=>{if(err)console.log(err);else console.log("server is up on the port : ",port)});