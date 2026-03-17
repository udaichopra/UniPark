export default function MySpots({ mySpots, bookings, handleDelete, spotdeletemsg }) {
    return (
        <div>
            <h2>My Listed Parking spots:</h2>
            {mySpots.map(myspot => (
                <div className="spot-card" key={myspot.id}>
                    <h3>Address:{myspot.address}</h3>
                    <h3>Price: {myspot.price}</h3>
                    <h3>Title: {myspot.title}</h3>
                    <button type="button" onClick={() => handleDelete(myspot.id)} >Delete this listing</button>
                    <h3>Bookings:</h3>
                    {bookings.filter(booking => booking.spot_id === myspot.id).map(booking => (
                        <div key={booking.bookid} className="spot-card">
                            <h3>Fullname: {booking.fullname}</h3>
                            <h3>Booking starts at:{new Date(booking.start_time).toLocaleString(undefined, {
                                dateStyle: "medium", timeStyle: "short"
                            })}</h3>
                            <h3>Booking Ends at:{new Date(booking.end_time).toLocaleString(undefined, {
                                dateStyle: "medium", timeStyle: "short"
                            })}</h3>
                        </div>
                    ))}
                </div>
            ))}
            <h3>{spotdeletemsg}</h3>

        </div>


    )
}