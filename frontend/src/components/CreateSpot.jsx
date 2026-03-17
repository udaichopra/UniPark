export default function CreateSpot({ handleClick, showForm, handleChange, handleSubmit, submitForm, submitMessage }) {
    return (
        <div>
            <h2>List your own parking spot here</h2>
            <div className="spot-card">
                <button type="button" onClick={handleClick}>Create Spot</button>
                {showForm && (
                    <form>
                        <h3>Address:</h3><input type="text" name="address" onChange={handleChange}></input>
                        <h3> Price$:</h3> <input type="number" name="price" onChange={handleChange} />
                        <h3>Title</h3> <input type="text" name="title" onChange={handleChange} />
                        <h3> </h3>
                        <button type="button" onClick={handleSubmit}>Submit Parking Spot</button>
                        {submitForm && (
                            <h3>{submitMessage}</h3>
                        )}
                    </form>

                )}
            </div>
        </div>
    )
}