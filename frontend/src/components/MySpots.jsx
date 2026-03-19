export default function MySpots({ mySpots, bookings, handleDelete, spotdeletemsg }) {
    return (
        <div>
            <h2>My Listed Parking spots:</h2>
            {mySpots.map(myspot => {
                const mySpotBookings= bookings.filter(booking=>booking.spot_id===myspot.id)
                return(
                    <div className="spot-card" >
                        <h3>Adress:{myspot.address}</h3>
                        <h3>Price: {myspot.price}$</h3>
                        <h3>Title: {myspot.title}</h3>
                        <button type="button" onClick={() => handleDelete(myspot.id)}>Delete this listing</button>
                        <h3>Bookings</h3>
                        {mySpotBookings.length===0&&(
                            <h3>Nobody Has booked this spot yet</h3>
                        )}
                        {mySpotBookings.map(booking => (
                            <div key={booking.bookid} className="booking-card">
                                <h3>Booked by :{booking.fullname}</h3>
                                <h3>From: {new Date(booking.start_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</h3>
                                <h3>To: {new Date(booking.end_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}</h3>
                            </div>
            
                         ))}
                        <h3>{spotdeletemsg}</h3>
                    </div>
                )
            })}
        </div>
    )
}