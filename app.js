const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.listen(3000,function(){
  console.log("Server started at port 3000");
});
app.set('view engine', 'ejs');
var books=[];
app.get("/",function(req,res){
  res.render("home",{
    john:"what",
    books:books,
  });
});
app.get("/add",function(req,res){
  res.render("add");
});
app.post("/add",function(req,res){
  var book={
    title:req.body.title,
    about:req.body.about
  };
  books.push(book);
  console.log(book);
  res.redirect("/");

});
app.get("/delete",function(req,res){
  res.render("delete");
});
app.post("/delete",function(req,res){
  var index=-1;
  var deletebook=req.body.title;
  console.log(deletebook);
  for(var i =0;i<books.length;i++)
  {
    if(books[i].title===deletebook)
    {
      index=i;
      console.log(i);
      break;
    }
  }
  console.log(index);
  books.splice(index, 1);
  res.redirect("/");

});
app.get("/book/:topic",function(req,res){
  var title=req.params.topic;
  books.forEach(function(item){
    if(item.title===title)
    {
      res.render("book",{
        title:item.title,
        about:item.about
      });
    }
  });
});
