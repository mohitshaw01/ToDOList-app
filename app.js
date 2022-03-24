const express = require("express");
const bodyparser = require("body-parser");
const ejs = require('ejs');
const res = require("express/lib/response");
const app = express();

let items= ["buy food","cook food"];
let workitems = [];
app.set('view engine', 'ejs');  //ejs setup
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  
// javascript format date to string
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today  = new Date();
let day = today.toLocaleDateString("hi-IN", options)

res.render("index",{listtitle:day , newlistitems: items});
});

app.post("/",(req,res)=>{
  let item = req.body.newitem;
  if(req.body.list ==="work"){
    workitems.push(item);
    res.redirect("/work")
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work",(req,res)=>{
  res.render("index",{listtitle:"work list",newlistitems:workitems})
});

app.post("/work",(req,res)=>{
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});

app.get("/aboutus",(req,res)=>{
  res.render("aboutus");
})



app.listen(3000,()=>{
    console.log("server has been started");
});
