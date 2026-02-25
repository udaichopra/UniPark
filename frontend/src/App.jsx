import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [spots, setSpots]=useState([])
  const [details,setDetails]=useState({price: "", title:"" })
  const [showForm,setShowForm]=useState(false)

  const handleChange=(event)=>{
    const name=event.target.name
    const value=event.target.value

    setDetails({...details,[name]:value})

  }
  const handleClick=()=>{
    setShowForm(true)
  }

  //fetch spots list from backend when spots api is sent 
  useEffect(() => {
    fetch("http://127.0.0.1:5050/spots")
      .then(response => response.json())
      .then(data => {setSpots(data);});
  }, [])

  const [submitMessage,setSubmitMessage]=useState("")

  const [submitForm, setSubmitForm]=useState(false)

  const handleSubmit=()=>{

    fetch("http://127.0.0.1:5050/spots",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(details)
    })
      .then(response=>response.json())
      .then (data=>{//learn why data equals this
        if (data.error){
          console.log(data.error)
          setSubmitMessage(data.error)
        }
        else{
        setSpots([...spots,data])
        setSubmitForm(true)
        setSubmitMessage("Spot Added Succesfully")
        setShowForm(false)
        setDetails({price: "", title: "" })
        }
    })
  }
  const [bookingSpotId,setBookingSpotId]=useState(null)
 
  const [bookings, setBookings]=useState([])

  const [bookdetails, setBookDetails]=useState({fullname:"",id:"", bookid:null, startTime:"", endTime:""})//for current bookings details

  const handleBookForm=(event)=>{
    const name =event.target.name
    const value=event.target.value
    setBookDetails({...bookdetails,[name]:value})
  }
  const handleBook=(spotId)=>{
    setBookingSpotId(spotId)
    setBookDetails({...bookdetails,id:spotId})
    setbooksubmitMsg("")
  }
  const [booksubmitMsg,setbooksubmitMsg]=useState("")
  const submitBooking=()=>{
    fetch("http://127.0.0.1:5050/bookings",{
      method:"POST",headers: {"Content-Type": "application/json"},body:JSON.stringify(bookdetails)//send spot id, fullname, start and end time to backend as a req
    })
    .then(response=>response.json())
    .then(data=>{
      if (data.error){
        console.log(data.error)
        setbooksubmitMsg(data.error)
      }
      else{
        const newBooking=data
        setBookings([...bookings,data])
        setBookDetails({fullname:"", id:"", bookid:null, startTime:"", endTime:""})
        setbooksubmitMsg("Booking successfully added.")
        setBookingSpotId(null)
          
      }
    })

  }

  useEffect(()=>{
    fetch("http://127.0.0.1:5050/bookings")
    .then(response=>response.json())
    .then (data=>setBookings(data))
  },[])
  
  


  return (
    <div>
      <h1>Available Parking Spots</h1>
      {spots.map(spot=>(
        <div key={spot.id}>
        <h1>id: {spot.id}, Price: {spot.price}$, Title: {spot.title}</h1>
        <button type="button" onClick={()=>handleBook(spot.id)}>Book This Spot</button>
        {bookingSpotId==spot.id &&(
          <form>
            <h1>Full name: </h1> <input type="text" name="fullname" onChange={handleBookForm}/>
            <h1>Parking start time</h1> <input type="datetime-local" name="startTime" onChange={handleBookForm}/>
            <h1>Parking end time</h1> <input type="datetime-local" name="endTime" onChange={handleBookForm}/>
            <button type="button" onClick={submitBooking}>Submit Booking</button>
          </form>
        )}
        </div>
        ))}
      <h1>{booksubmitMsg}</h1>
      <div>
        <button onClick={handleClick}>Create Spot</button>
        {showForm &&(
          <form>
            <h1> Price$:</h1> <input type="number" name="price" onChange={handleChange}/>
            <h1>Title</h1> <input type="text" name="title" onChange={handleChange}/>
            <button type="button" onClick={handleSubmit}>Sumbit Parking Spot</button>
            </form>
    )} 
      </div>


      <div>
        <h1>My Bookings:</h1>
        {bookings.map(booking=>(
          <h1 key={booking.bookid}>Parking Id:{booking.spot_id}, Booking id: {booking.bookid},
          Parking Starts at :{booking.start_time}, Parking ends at: {booking.end_time} Fullname: {booking.fullname} </h1>
        ))}
        
      </div>
      {submitForm && (
        <h1>{submitMessage}</h1>
      )}
      {!submitForm && (
        <h1>{submitMessage}</h1>
      )}
    </div>
  
  );

}

export default App;
