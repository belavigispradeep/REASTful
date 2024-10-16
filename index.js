const express=require("express");
const app=express();
const port=8080;

const path=require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:"1a",
        username:"tcs",
        content:"Harnessing cutting-edge technology and innovation for sustainable, purpose-driven transformations globally."
    },
    {
        id:"2a",
        username:"microsoft",
        content:"We're on a mission to empower every person and every organization on the planet to achieve more."
    },
    {
        id:"3a",
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
    posts.push({username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((post)=>{ return id===post.id});
    res.render("show.ejs",{post});
})




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});