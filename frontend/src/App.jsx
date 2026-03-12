import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "./assets/uniparklogo.png"
import { supabase } from "./supabaseClient";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function App() {
  const [spots, setSpots] = useState([])
  const [details, setDetails] = useState({ address: "", price: "", title: "" })
  const [showForm, setShowForm] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setDetails({ ...details, [name]: value })

  }
  const handleClick = () => {
    setShowForm(true)
  }

  //fetch spots list from backend when spots api is sent 
  useEffect(() => {
    fetch("http://127.0.0.1:5050/spots")
      .then(response => response.json())
      .then(data => { setSpots(data); });
  }, [])

  const [submitMessage, setSubmitMessage] = useState("")

  const [submitForm, setSubmitForm] = useState(false)

  const handleSubmit = () => {

    fetch("http://127.0.0.1:5050/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
          setSubmitMessage(data.error)
        }
        else {
          setSpots([...spots, data])
          setSubmitForm(true)
          setSubmitMessage("Spot Added Succesfully")
          setShowForm(false)
          setDetails({ address: "", price: "", title: "" })
        }
      })
  }
  const [bookingSpotId, setBookingSpotId] = useState(null)

  const [bookings, setBookings] = useState([])

  const [bookdetails, setBookDetails] = useState({ fullname: "", id: "", bookid: null, startTime: "", endTime: "" })//for current bookings details

  const handleBookForm = (event) => {
    const name = event.target.name
    const value = event.target.value
    setBookDetails({ ...bookdetails, [name]: value })
  }
  const handleBook = (spotId) => {
    setBookingSpotId(spotId)
    setBookDetails({ ...bookdetails, id: spotId })
    setbooksubmitMsg("")
  }
  const [booksubmitMsg, setbooksubmitMsg] = useState("")
  const submitBooking = () => {
    fetch("http://127.0.0.1:5050/bookings", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(bookdetails)//send spot id, fullname, start and end time to backend as a req
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
          setbooksubmitMsg(data.error)
        }
        else {
          setBookings([...bookings, data])
          setBookDetails({ fullname: "", id: "", bookid: null, startTime: "", endTime: "" })
          setbooksubmitMsg("Booking successfully added.")
          setBookingSpotId(null)
        }
      })
  }
  const [cancelBookingMsg, setcancelBookingMsg] = useState("")
  useEffect(() => {
    fetch("http://127.0.0.1:5050/bookings")
      .then(response => response.json())
      .then(data => setBookings(data))
  }, [])

  const cancelBooking = (bookid) => {
    fetch(`http://127.0.0.1:5050/bookings/${bookid}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then((data => {
        if (data.error) {
          setcancelBookingMsg(data.error)
          return;
        }
        else {
          setBookings(prevlist => prevlist.filter(b => b.bookid !== data.bookid))//update frontend bookings list so we dont show deleted spot in my bookings
          setcancelBookingMsg("Booking deleted")
          return;
        }
      }));
  }
  const [session, setSession] = useState(null)
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session)
    }
    getSession();

  }, [])
  const [signinform, setSigninform] = useState(false)
  const signin = () => {
    setSigninform(prev => !prev)
  }
  const [signindetails, setSignindetails] = useState({ email: "", password: "" })

  const handleSignin = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSignindetails({ ...signindetails, [name]: value });
  }
  const [signinmessage, setSigninmessage] = useState("")
  const submitSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: signindetails.email, password: signindetails.password });
    if (error) {
      setSigninmessage(error.message);
      return;
    }
    setSession(data.session);
    setSignindetails({ email: "", password: "" })
    setSigninform(false)

  }
  const [signupform, setSignupform] = useState(false)
  const signup = () => {
    setSignupform(prev => !prev)
  }
  const [signupdetails, setSignupdetails] = useState({ email: "", password: "" });

  const handleSignup = (event) => {
    const name = event.target.name
    const value = event.target.value
    setSignupdetails({ ...signupdetails, [name]: value })
  }
  const [signupmsg, setSignupmsg] = useState("")

  const submitSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email: signupdetails.email, password: signupdetails.password })
    if (error) {
      setSignupmsg(error.message)
      return;
    }
    if (data.session) {
      setSession(data.session)
      setSignupdetails({ email: "", password: "" })
      setSignupform(false)
    }
    else{
      setSignupmsg("A email has been sent to verify your account")
    }

  }
  const handleSignout=async()=>{
    await supabase.auth.signOut()
    setSession(null)
  }


  return (
    //Show available parking spots, with a book button for each spot, when book button is clicked, show a form to fill in booking details and submit the booking
    <div>
      <div className="header">
        <img src={logo} alt="UniPark Logo" className="logo" />
      </div>
      <div>
        {!session && (
          <div>
            <button type="button" onClick={signin}>Sign in</button>
            {signinform && (
              <form>
                <h3>Email: </h3> <input type="email" name="email" onChange={handleSignin}></input>
                <h3>Password: </h3> <input type="password" name="password" onChange={handleSignin}></input>
                <button type="button" onClick={submitSignin}>Submit Sign in</button>
                {signinmessage && (
                  <h3>{signinmessage}</h3>
                )}
              </form>
            )}
            <button type="button" onClick={signup}>Sign up</button>
            {signupform && (
              <form>
                <h3>Email: </h3><input type="email" name="email" onChange={handleSignup}></input>
                <h3>Password: </h3><input type="password" name="password" onChange={handleSignup}></input>
                <button type="button" onClick={submitSignup}>Submit sign up</button>
                {signupmsg && (
                  <h3>{signupmsg}</h3>
                )}
              </form>
            )}
          </div>

        )}
      </div>
      {session && (
        <div>
          <button type="button" onClick={handleSignout}>Sign out</button>
          <h3> </h3>
          <div className="map-container">
            <MapContainer
              center={[43.47408332564644, -80.5294431606201]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              {spots.map(spot => (
                <Marker key={spot.id} position={[Number(spot.lat), Number(spot.lon)]}>
                  <Popup>
                    <h3>Title: {spot.title}</h3>
                    <h3>{spot.price}$</h3>
                    <h3> Address: {spot.address}</h3>
                    <button type="button" onClick={() => handleBook(spot.id)}>Book This Spot</button>
                  </Popup>
                </Marker>
              ))}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </div>


          <div className="page-container">
            <h2>Available Parking Spots</h2>
            {spots.map(spot => (
              <div className="spot-card"
                key={spot.id}>
                <h3>Title: {spot.title}</h3>
                <h3> Address: {spot.address}</h3>
                <h3> Price: {spot.price}$</h3>
                <h3> Id: {spot.id}</h3>
                <button type="button" onClick={() => handleBook(spot.id)}>Book This Spot</button>
                {bookingSpotId == spot.id && (
                  <form>
                    <h3>Full name: </h3> <input type="text" name="fullname" onChange={handleBookForm} />
                    <h3>Parking start time</h3> <input type="datetime-local" name="startTime" onChange={handleBookForm} />
                    <h3>Parking end time</h3> <input type="datetime-local" name="endTime" onChange={handleBookForm} />
                    <button type="button" onClick={submitBooking}>Submit Booking</button>
                    <h3>{booksubmitMsg}</h3>
                  </form>
                )}
              </div>
            ))}


            {/*form to create a new parking spot,
      only shown when create spot button is clicked*/}


            <h2>List your own parking spot here</h2>
            <div className="spot-card">
              <button onClick={handleClick}>Create Spot</button>
              {showForm && (
                <form>
                  <h3>Address:</h3><input type="text" name="address" onChange={handleChange}></input>
                  <h3> Price$:</h3> <input type="number" name="price" onChange={handleChange} />
                  <h3>Title</h3> <input type="text" name="title" onChange={handleChange} />
                  <h3> </h3>
                  <button type="button" onClick={handleSubmit}>Sumbit Parking Spot</button>
                </form>
              )}
              {submitForm && (
                <h3>{submitMessage}</h3>
              )}



              {/*Show my bookings section, where user 
      can see all their bookings and cancel them*/}


            </div>
            <h2>My Bookings:</h2>
            <div>
              {bookings.map(booking => (
                <div className="booking-card" key={booking.bookid}>
                  <h3>Parking Id:{booking.spot_id}</h3>
                  <h3>Booking id: {booking.bookid}</h3>
                  <h3>Parking Starts at : {new Date(booking.start_time).toLocaleString(undefined, {
                    dateStyle: "medium", timeStyle: "short"
                  })}</h3>
                  <h3>Parking ends at: {new Date(booking.end_time).toLocaleString(undefined, {
                    dateStyle: "medium", timeStyle: "short"
                  })}</h3>
                  <h3>Fullname: {booking.fullname}</h3>
                  <button type="button" onClick={() => cancelBooking(booking.bookid)}>Cancel this booking</button>
                </div>
              ))}
              {cancelBookingMsg && (
                <h3>{cancelBookingMsg}</h3>

              )}

            </div>

          </div>
        </div>
      )}


    </div>
  );

}

export default App;
