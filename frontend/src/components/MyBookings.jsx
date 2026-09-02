export default function MyBookings({ myBookings, cancelBooking, cancelBookingMsg, spots }) {
  return (
    <section>
      <h2 className="mb-4 text-center text-xl font-semibold text-ink">My bookings</h2>

      {myBookings.length === 0 && (
        <p className="text-center text-sm text-muted">You haven't made any bookings yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {myBookings.map(booking => {
          const spot = spots.find(s => s.id === booking.spot_id);

          return (
            <div key={booking.bookid} className="rounded-xl border border-edge bg-card p-5 text-center">
              <h3 className="text-base font-medium text-ink">{spot ? spot.title : "Unknown listing"}</h3>
              <p className="mt-1 text-sm text-muted">{spot ? spot.address : "Unknown location"}</p>
              <p className="mt-1 text-sm font-medium text-accent">{spot ? `$${spot.price}` : "Unknown price"}</p>
              <p className="mt-3 text-sm text-muted">
                {new Date(booking.start_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                {" – "}
                {new Date(booking.end_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
              </p>
              <p className="mt-1 text-sm text-muted">Booked by {booking.fullname}</p>

              <button
                type="button"
                onClick={() => cancelBooking(booking.bookid)}
                className="mt-3 rounded-lg border border-edge px-4 py-2 text-sm font-medium text-muted hover:border-accent hover:text-ink"
              >
                Cancel
              </button>
            </div>
          );
        })}
        {cancelBookingMsg && <p className="text-center text-sm text-muted">{cancelBookingMsg}</p>}
      </div>
    </section>
  );
}
