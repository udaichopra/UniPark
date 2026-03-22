export default function AvailableSpots({bookForm, setBookForm,availableSpots,handleBook,bookingSpotId,handleBookForm,submitBooking,booksubmitMsg,bookings}) {
    return (
        <div>
            <h2>Available Parking Spots</h2>
            {availableSpots.map(spot => {
                const spotBookings=bookings.filter(booking=>booking.spot_id===spot.id)
                return(
                    <div className="spot-card"
                    key={spot.id}>
                    <h3>Title: {spot.title}</h3>
                    <h3> Address: {spot.address}</h3>
                    <h3> Price: {spot.price}$</h3>
                    {spotBookings.length===0&&(
                        <h3>This Spot has no Bookings yet</h3>
                    )}
                    {spotBookings.length>0&&(
                        <div>
                        <h3>Unavailable time slots:</h3>
                        {spotBookings.map(spotBooking=>(
                            <div key={spotBooking.start_time}>
                            <h3>{new Date(spotBooking.start_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })} - {new Date(spotBooking.end_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })} </h3>
                            </div>
                        ))}
                        </div>
                    )}
                    <button type="button" onClick={() => handleBook(spot.id)}>{bookForm ? "Cancel": "Book this spot"}</button>
                    {bookingSpotId === spot.id && bookForm && (
                        <form className="booking-form">
                            <h3>Full name: </h3> <input type="text" name="fullname" onChange={handleBookForm} />
                            <h3>Parking start time</h3> <input type="datetime-local" name="startTime" onChange={handleBookForm} />
                            <h3>Parking end time</h3> <input type="datetime-local" name="endTime" onChange={handleBookForm} />
                            <h3></h3>
                            <button type="button" onClick={submitBooking}>Submit Booking</button>
                            <h3>{booksubmitMsg}</h3>
                        </form>
                    )}
                </div>
                    
                )
            })}
        </div>
    )
}