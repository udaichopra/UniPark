export default function AvailableSpots({availableSpots,handleBook,bookingSpotId,handleBookForm,submitBooking,booksubmitMsg}) {
    return (
        <div>
            <h2>Available Parking Spots</h2>
            {availableSpots.map(spot => (
                <div className="spot-card"
                    key={spot.id}>
                    <h3>Title: {spot.title}</h3>
                    <h3> Address: {spot.address}</h3>
                    <h3> Price: {spot.price}$</h3>
                    <button type="button" onClick={() => handleBook(spot.id)}>Book This Spot</button>
                    {bookingSpotId === spot.id && (
                        <form>
                            <h3>Full name: </h3> <input type="text" name="fullname" onChange={handleBookForm} />
                            <h3>Parking start time</h3> <input type="datetime-local" name="startTime" onChange={handleBookForm} />
                            <h3>Parking end time</h3> <input type="datetime-local" name="endTime" onChange={handleBookForm} />
                            <h3></h3>
                            <button type="button" onClick={submitBooking}>Submit Booking</button>
                            <h3>{booksubmitMsg}</h3>
                        </form>
                    )}
                </div>
            ))}
        </div>
    )
}