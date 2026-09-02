export default function CreateSpot({ showForm, setShowForm, handleChange, handleSubmit, submitForm, submitMessage }) {
  return (
    <section>
      <h2 className="mb-4 text-center text-xl font-semibold text-ink">List your own parking spot</h2>

      <div className="mx-auto max-w-sm rounded-xl border border-edge bg-card p-5 text-center">
        <button
          type="button"
          onClick={() => setShowForm(prev => !prev)}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong"
        >
          {showForm ? "Cancel" : "Create spot"}
        </button>

        {showForm && (
          <form className="mt-4 flex flex-col gap-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <input
              type="number"
              name="price"
              placeholder="Price per day ($)"
              onChange={handleChange}
              className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-accent py-2 text-sm font-medium text-white hover:bg-accent-strong"
            >
              Submit
            </button>
            {submitForm && <p className="text-sm text-muted">{submitMessage}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
