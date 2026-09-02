export default function AvailableSpots({
  bookForm, availableSpots, handleBook, bookingSpotId,
  handleBookForm, submitBooking, booksubmitMsg, bookings,
}) {
  return (
    <section>
      <h2 className="mb-4 text-center text-xl font-semibold text-ink">Available parking spots</h2>

      {availableSpots.length === 0 && (
        <p className="text-center text-sm text-muted">No spots available right now.</p>
      )}

      <div className="flex flex-col gap-4">
        {availableSpots.map(spot => {
          const spotBookings = bookings.filter(booking => booking.spot_id === spot.id);
          const isBooking = bookingSpotId === spot.id && bookForm;

          return (
            <div key={spot.id} className="rounded-xl border border-edge bg-card p-5 text-center transition hover:border-accent">
              <h3 className="text-base font-medium text-ink">{spot.title}</h3>
              <p className="mt-1 text-sm text-muted">{spot.address}</p>
              <p className="mt-1 text-sm font-medium text-accent">${spot.price}</p>

              {spotBookings.length === 0 ? (
                <p className="mt-3 text-sm text-muted">No bookings yet</p>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-muted">Unavailable:</p>
                  {spotBookings.map(spotBooking => (
                    <p key={spotBooking.start_time} className="text-sm text-muted">
                      {new Date(spotBooking.start_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      {" – "}
                      {new Date(spotBooking.end_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => handleBook(spot.id)}
                className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong"
              >
                {isBooking ? "Cancel" : "Book this spot"}
              </button>

              {isBooking && (
                <form className="mx-auto mt-4 flex max-w-xs flex-col gap-2">
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    onChange={handleBookForm}
                    className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                  />
                  <input
                    type="datetime-local"
                    name="startTime"
                    onChange={handleBookForm}
                    className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                  />
                  <input
                    type="datetime-local"
                    name="endTime"
                    onChange={handleBookForm}
                    className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={submitBooking}
                    className="rounded-lg bg-accent py-2 text-sm font-medium text-white hover:bg-accent-strong"
                  >
                    Submit booking
                  </button>
                  {booksubmitMsg && <p className="text-center text-sm text-muted">{booksubmitMsg}</p>}
                </form>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
