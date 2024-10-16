const express=require("express");
const app=express();
const port=8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


const path=require("path");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"tcs",
        content:"Harnessing cutting-edge technology and innovation for sustainable, purpose-driven transformations globally."
    },
    {
        id:uuidv4(),
        username:"microsoft",
        content:"We're on a mission to empower every person and every organization on the planet to achieve more."
    },
    {
        id:uuidv4(),
        username:"google",
        content:"Organizing the world's information and making it universally accessible and useful."
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    posts.push({id:uuidv4(),username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((post)=>{ return id===post.id});
    res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent = req.body.content;
    let post = posts.find((post)=>{ return id===post.id});
    post.content=newContent;
    res.send("patch is working");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((post)=>{ return id===post.id});
    res.render("edit.ejs",{post});
})




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});