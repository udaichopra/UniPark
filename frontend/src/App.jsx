import { useState, useEffect } from 'react'
import logo from "./assets/uniparklogo.png"
import { supabase } from "./supabaseClient";
import MyBookings from "./components/MyBookings";
import AuthSection from './components/AuthSection';
import ShowMap from './components/ShowMap';
import AvailableSpots from './components/AvailableSpots';
import CreateSpot from './components/CreateSpot';
import MySpots from './components/MySpots';

const TABS = [
  { key: "bookspot", label: "Browse spots" },
  { key: "Mylistings", label: "My listings" },
  { key: "ListSpot", label: "List a spot" },
  { key: "Mybookings", label: "My bookings" },
]

function App() {
  const [spots, setSpots] = useState([])
  const [details, setDetails] = useState({ address: "", price: "", title: "" })
  const [showForm, setShowForm] = useState(false)
  const [tab, setTab] = useState("bookspot")
  const [authOpen, setAuthOpen] = useState(false)
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setDetails({ ...details, [name]: value })

  }

  //fetch spots list from backend when spots api is sent
  useEffect(() => {
    fetch(`${API}/spots`)
      .then(response => response.json())
      .then(data => { setSpots(Array.isArray(data) ? data : []); });
  }, [])

  const [submitMessage, setSubmitMessage] = useState("")

  const [submitForm, setSubmitForm] = useState(false)

  const handleSubmit = () => {

    fetch(`${API}/spots`, {
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
  const [bookForm, setBookForm] = useState(false)

  const handleBookForm = (event) => {
    const name = event.target.name
    const value = event.target.value
    setBookDetails({ ...bookdetails, [name]: value })
  }
  const handleBook = (spotId) => {
    if (!session) {
      setAuthOpen(true)
      return
    }
    setBookingSpotId(spotId)
    setBookDetails({ ...bookdetails, id: spotId })
    setBookForm(prev => !prev);
    setbooksubmitMsg("")
  }
  const [booksubmitMsg, setbooksubmitMsg] = useState("")
  const submitBooking = () => {
    fetch(`${API}/bookings`, {
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
    fetch(`${API}/bookings`)
      .then(response => response.json())
      .then(data => setBookings(Array.isArray(data) ? data : []))
  }, [])

  const cancelBooking = (bookid) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?")
    if (!confirmCancel) {
      return
    }
    fetch(`${API}/bookings/${bookid}`, {
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
    setAuthOpen(false)

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
      setAuthOpen(false)
    }
    else {
      setSignupmsg("A email has been sent to verify your account")
    }

  }
  const handleSignout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setTab("bookspot")
  }
  const mySpots = session ? spots.filter(spot => spot.owner_id === session.user.id) : [];
  const availableSpots = session ? spots.filter(spot => session.user.id !== spot.owner_id) : spots;
  const [spotdeletemsg, setSpotdeletemsg] = useState("")
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this spot")
    if (!confirmDelete) {
      return
    }
    fetch(`${API}/spots/${id}`, {
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

  const openTab = (key) => {
    if (key !== "bookspot" && !session) {
      setAuthOpen(true)
      return
    }
    setTab(key)
  }

  return (
    <div className="min-h-screen bg-base">
      <header className="sticky top-0 z-20 flex flex-col items-center gap-4 border-b border-edge bg-surface px-4 py-3 sm:flex-row sm:justify-between">
        <img src={logo} alt="UniPark Logo" className="h-12 w-auto" />

        <nav className="flex flex-wrap justify-center gap-2 rounded-full border border-edge bg-card/60 p-1">
          {TABS.map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => openTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === t.key ? "bg-accent text-white" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {session ? (
          <button
            type="button"
            onClick={handleSignout}
            className="rounded-full border border-edge px-4 py-2 text-sm font-medium text-muted hover:text-ink"
          >
            Sign out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong"
          >
            Sign in
          </button>
        )}
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-8">
        {tab === "bookspot" && (
          <div className="flex flex-col gap-6">
            <ShowMap availableSpots={availableSpots} handleBook={handleBook} />
            <AvailableSpots
              availableSpots={availableSpots}
              handleBook={handleBook}
              bookingSpotId={bookingSpotId}
              handleBookForm={handleBookForm}
              submitBooking={submitBooking}
              booksubmitMsg={booksubmitMsg}
              bookings={bookings}
              bookForm={bookForm}
            />
          </div>
        )}

        {tab === "ListSpot" && session && (
          <CreateSpot
            showForm={showForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            submitForm={submitForm}
            submitMessage={submitMessage}
            setShowForm={setShowForm}
          />
        )}

        {tab === "Mylistings" && session && (
          <MySpots
            mySpots={mySpots}
            bookings={bookings}
            handleDelete={handleDelete}
            spotdeletemsg={spotdeletemsg}
          />
        )}

        {tab === "Mybookings" && session && (
          <MyBookings
            myBookings={myBookings}
            cancelBooking={cancelBooking}
            cancelBookingMsg={cancelBookingMsg}
            spots={spots}
          />
        )}
      </main>

      {authOpen && (
        <AuthSection
          onClose={() => setAuthOpen(false)}
          handleSignin={handleSignin}
          submitSignin={submitSignin}
          signinmessage={signinmessage}
          handleSignup={handleSignup}
          submitSignup={submitSignup}
          signupmsg={signupmsg}
        />
      )}
    </div>
  )
}
export default App;
