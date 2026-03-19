import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from "./assets/uniparklogo.png"
import { supabase } from "./supabaseClient";
import MyBookings from "./components/MyBookings";
import AuthSection from './components/AuthSection';
import ShowMap from './components/ShowMap';
import AvailableSpots from './components/AvailableSpots';
import CreateSpot from './components/CreateSpot';
import MySpots from './components/MySpots';

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
      body: JSON.stringify({ ...details, owner_id: session.user.id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
          setSubmitForm(true)
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
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...bookdetails, user_id: session.user.id })//send spot id, fullname, start and end time to backend as a req
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
    else {
      setSignupmsg("A email has been sent to verify your account")
    }

  }
  const handleSignout = async () => {
    await supabase.auth.signOut()
    setSession(null)
  }
  const mySpots = session ? spots.filter(spot => spot.owner_id === session.user.id) : [];
  const availableSpots = session ? spots.filter(spot => session.user.id !== spot.owner_id) : [];
  const [spotdeletemsg, setSpotdeletemsg] = useState("")
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5050/spots/${id}`, {
      method: "delete"
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setSpotdeletemsg(data.error)
          setTimeout(() => {
            setSpotdeletemsg("")
          }, 3000);
        }
        else {
          setSpots(prev => prev.filter(spot => spot.id !== data.id))
          setSpotdeletemsg("spot deleted successfully")
          setTimeout(() => {
            setSpotdeletemsg("")
          }, 3000);

        }
      })
  }
  const myBookings = session ? bookings.filter(booking => booking.user_id === session.user.id) : [];
  const [tab, setTab] = useState("bookspot");
  return (
    <div>
      <div className="header">
        <img src={logo} alt="UniPark Logo" className="logo" />
      </div>
      <div>
        {!session && (
          <AuthSection
            signinform={signinform}
            signin={signin}
            handleSignin={handleSignin}
            submitSignin={submitSignin}
            signinmessage={signinmessage}
            signupform={signupform}
            signup={signup}
            handleSignup={handleSignup}
            submitSignup={submitSignup}
            signupmsg={signupmsg}
          />
        )}
      </div>
      {session && (
        <div>
          <div className="tab-bar">
            <div className="tab-bar-inner">
              <button type="button" className={`tab-button ${tab === "bookspot" ? "active" : ""}`} onClick={() => setTab("bookspot")}>Book a Parking spot</button>
              <button type="button" className={`tab-button ${tab === "bookspot" ? "active" : ""}`} onClick={() => setTab("Mylistings")}>My Listings</button>
              <button type="button" className={`tab-button ${tab === "bookspot" ? "active" : ""}`} onClick={() => setTab("ListSpot")}>List your own parking space</button>
              <button type="button" className={`tab-button ${tab === "bookspot" ? "active" : ""}`} onClick={() => setTab("Mybookings")}>My Bookings</button>
              <button type="button" className={`tab-button ${tab === "bookspot" ? "active" : ""}`} onClick={handleSignout}>Sign out</button>
            </div>
          </div>
          {tab === "bookspot" && (
            <div>
              <ShowMap availableSpots={availableSpots} handleBook={handleBook} />
              <AvailableSpots
                availableSpots={availableSpots}
                handleBook={handleBook}
                bookingSpotId={bookingSpotId}
                handleBookForm={handleBookForm}
                submitBooking={submitBooking}
                booksubmitMsg={booksubmitMsg}
              />
            </div>
          )}
          {tab === "ListSpot" && (
            <CreateSpot
              handleClick={handleClick}
              showForm={showForm}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              submitForm={submitForm}
              submitMessage={submitMessage}
            />
          )}
          {tab === "Mylistings" && (
            <MySpots
              mySpots={mySpots}
              bookings={bookings}
              handleDelete={handleDelete}
              spotdeletemsg={spotdeletemsg}
            />
          )}
          {tab === "Mybookings" && (
            <MyBookings
              myBookings={myBookings}
              cancelBooking={cancelBooking}
              cancelBookingMsg={cancelBookingMsg}
              spots={spots}
            />
          )}
        </div>
      )}
    </div>
  )
}
export default App;
