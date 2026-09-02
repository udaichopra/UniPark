export default function MySpots({ mySpots, bookings, handleDelete, spotdeletemsg }) {
  return (
    <section>
      <h2 className="mb-4 text-center text-xl font-semibold text-ink">My listed parking spots</h2>

      {mySpots.length === 0 && (
        <p className="text-center text-sm text-muted">You haven't listed any spots yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {mySpots.map(spot => {
          const spotBookings = bookings.filter(booking => booking.spot_id === spot.id);

          return (
            <div key={spot.id} className="rounded-xl border border-edge bg-card p-5 text-center">
              <h3 className="text-base font-medium text-ink">{spot.title}</h3>
              <p className="mt-1 text-sm text-muted">{spot.address}</p>
              <p className="mt-1 text-sm font-medium text-accent">${spot.price}</p>

              <button
                type="button"
                onClick={() => handleDelete(spot.id)}
                className="mt-3 rounded-lg border border-edge px-4 py-2 text-sm font-medium text-muted hover:border-accent hover:text-ink"
              >
                Delete this listing
              </button>

              <div className="mt-4">
                <p className="text-sm font-medium text-ink">Bookings</p>
                {spotBookings.length === 0 ? (
                  <p className="mt-1 text-sm text-muted">No one has booked this spot yet.</p>
                ) : (
                  spotBookings.map(booking => (
                    <div key={booking.bookid} className="mt-2 rounded-lg bg-surface p-3">
                      <p className="text-sm text-muted">Booked by {booking.fullname}</p>
                      <p className="text-sm text-muted">
                        {new Date(booking.start_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                        {" – "}
                        {new Date(booking.end_time).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {spotdeletemsg && <p className="mt-3 text-sm text-muted">{spotdeletemsg}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
