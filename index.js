const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path =  require("path");
const Chat = require("./models/chats.js");
const { rmSync } = require("fs");
const { log } = require("console");
app.use(express.static(path.join(__dirname, 'public')));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

const methodOverride= require("method-override");
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("Connections Suceessful");
})
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}




//Index Route
app.get("/chats",async (req,res)=>{
   let chats =await Chat.find();
   res.render("index.ejs",{chats});
});

// NEW ROUTE 
app.get("/chats/new",(req,res)=>{
res.render("new.ejs");
});

// Create Route
app.post("/chats",(req,res)=>{
let {from,to,msg}=req.body;
let newChat = new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at: new Date()
});


newChat.save().then(res=>{
    console.log()
})
.catch(err => {console.log(err);
})
res.redirect("/chats");
})
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat =await Chat.findById(id);
res.render("edit.ejs",{chat});
});
//UPDATE ROUTE
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    console.log(newMsg);
    
    let updateChat =await Chat.findByIdAndUpdate(id,{msg:newMsg},
        {
        runValidators:true,new:true
    });
    console.log(updateChat);
    res.redirect("/chats");
});

// DESTROY ROUTE
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
   let chattodel=await Chat.findByIdAndDelete(id);
   console.log(chattodel);
   res.redirect("/chats");
   
});
app.get("/",(req,res)=>{
    res.send("Working");
});

app.listen(8080,()=>{
    console.log("Server is listening....");
});