const supabase = require("./supabaseClient");
const express = require("express");
const cors = require("cors");
//load libraries

const app = express();//create server for app
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/spots", async(req, res) => {
  const {data,error}= await supabase.from("spots").select("*");
  if (error){
    res.status(400).json({error:error.message});
    return;
  }
  return res.json(data);
});
app.post("/spots",async(req,res) => {
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
    const newSpot= {price: price, title: title.trim()};//create an object for newspot created
    const {data,error}= await supabase.from("spots").insert(newSpot).select();
    if (error){
      return res.status(500).json({error:error.message});
    }
    res.status(201).json(data[0]);
    return;
  }
});
app.get("/bookings",async(req,res)=>{
  const {data,error}= await supabase.from("bookings").select("*");
  if (error){
    res.status(400).json({error:error.message});
    return;
  }
  return res.json(data);
})
app.post("/bookings",async(req,res)=>{
  const fullname=req.body.fullname
  const id= Number(req.body.id)
  const startTime=new Date(req.body.startTime)
  const endTime=new Date(req.body.endTime)
  if (Number.isNaN(id)||id<=0){
    return res.status(400).json({error: "spot id is not valid"});
  }
  else if (typeof fullname !=="string"){
    return res.status(400).json({error: "Not a valid name"});
  }
  else if (fullname.trim().length===0){
    return res.status(400).json({error:"Fullname field is empty"});
  }
  else if (isNaN(startTime)||isNaN(endTime)){
    return res.status(400).json({error:"Invalid date format"});
  }
  else if (startTime >= endTime) {
    return res.status(400).json({ error: "End time must be after start time" });
    
  }
  else{
    const {data:existingBookings,error:fetchError}= await supabase.from("bookings").select("*").eq("spot_id",id)
    if (fetchError){
      return res.status(500).json({error:fetchError.message})
    }
    for(let i=0;i<existingBookings.length; i++){
      const prevbooking=existingBookings[i];
      const prevstartTime=new Date(prevbooking.start_time);
      const prevendTime= new Date(prevbooking.end_time);

      if (prevstartTime < endTime && prevendTime>startTime){
        return res.status(400).json({error:"This spot is unavailble at the time you've selected"});
      }
    }
    const submitBookingInput={spot_id:id,start_time:startTime,end_time: endTime ,fullname:fullname.trim()};
    const {data,error}= await supabase.from("bookings").insert(submitBookingInput).select()
    if (error){
      return res.status(500).json({error:error.message});
    }
    return res.status(201).json(data[0]);
  }
});

const PORT = 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});