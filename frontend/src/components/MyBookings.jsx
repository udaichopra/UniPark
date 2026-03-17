export default function MyBookings({ myBookings, cancelBooking, cancelBookingMsg }) {
    return (
        <div>
            <h2>My Bookings:</h2>
            <div>
                {myBookings.map(booking => (
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
    )
}