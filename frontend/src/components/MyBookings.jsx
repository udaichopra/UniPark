export default function MyBookings({ myBookings, cancelBooking, cancelBookingMsg, spots }) {
    return (
        <div>
            <h2>My Bookings:</h2>
            <div>
                {myBookings.map(booking => {
                    const spot = spots.find(s => s.id === booking.spot_id)
                    return (
                        <div className="booking-card" key={booking.bookid}>
                            <h3>Address: {spot ? spot.address : "Unknown location"}</h3>
                            <h3>Price: {spot ? spot.price : "Unknown price"}$</h3>
                            <h3>Title: {spot ? spot.title : "Unknown title"}</h3>
                            <h3>From: {new Date(booking.start_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</h3>
                            <h3>To: {new Date(booking.end_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</h3>
                            <h3>Booked by: {booking.fullname}</h3>
                            <button type="button" onClick={() => cancelBooking(booking.bookid)}>Cancel</button>
                        </div>
                    )
                })}
                {cancelBookingMsg && <h3>{cancelBookingMsg}</h3>}
            </div>
        </div>
    )
}