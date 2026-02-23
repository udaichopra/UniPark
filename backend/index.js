const express = require("express");
const cors = require("cors");
//load libraries

const app = express();//create server for app
const spots = [
  { id: 1, price: 6, title: "Near Gym" }
]
const bookings=[]
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/spots", (req, res) => {
  res.json(spots);
});
app.post("/spots",(req,res) => {
  const price=Number(req.body.price)
  const title=req.body.title
  if (Number.isNaN(price) || price <= 0){
    res.status(400).json({error: "Price is not valid"});
    return;
  }
  else if (typeof title !== "string"){
    res.status(400).json({error: "Title must be a string"});
    return;
  }
  else if (title.trim().length===0){
    res.status(400).json({error: "Title is empty"});
    return;
  }
  else{
    const newSpot= { id: spots.length+1 ,price: price, title: title.trim()};//create an object for newspot created
    spots.push(newSpot);
    res.status(201).json(newSpot);
    return;
  }
  

});
app.get("/bookings",(req,res)=>{
  res.json(bookings)
})
app.post("/bookings",(req,res)=>{
  const fullname=req.body.fullname
  const id= Number(req.body.id)
  const startTime=new Date(req.body.startTime)
  const endTime=new Date(req.body.endTime)
  if (Number.isNaN(id)||id<=0){
    res.status(400).json({error: "spot id is not valid"});
    return;
  }
  else if (typeof fullname !=="string"){
    res.status(400).json({error: "Not a valid name"});
    return;
  }
  else if (fullname.trim().length===0){
    res.status(400).json({error:"Fullname field is empty"});
    return;
  }
  else if (isNaN(startTime)||isNaN(endTime)){
    res.status(400).json({error:"Invalid date format"});
    return;
  }
  else if (startTime >= endTime) {
    res.status(400).json({ error: "End time must be after start time" });
    return;
  }
  else{
    const checknewBooking={id:id, bookid:bookings.length+1,startTime:startTime,endTime: endTime ,fullname:fullname};
    for(let i=0;i<bookings.length; i++){
      const prevbooking=bookings[i];
      if (prevbooking.id===checknewBooking.id){
        if (prevbooking.startTime < checknewBooking.endTime && prevbooking.endTime>checknewBooking.startTime){
          res.status(400).json({error:"This spot is unavailble at the time you've selected"});
          return;
        }
      }
    }
  }
  
  const newBooking={id:id, bookid:bookings.length+1,startTime:startTime,endTime: endTime ,fullname:fullname};
  bookings.push(newBooking);
  res.status(201).json(newBooking);


});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});