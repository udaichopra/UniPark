import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
export default function ShowMap({availableSpots,handleBook}) {
    return (
        <div className="map-container">
            <MapContainer
                center={[43.47408332564644, -80.5294431606201]}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                {availableSpots.map(spot => (
                    <Marker key={spot.id} position={[Number(spot.lat), Number(spot.lon)]}>
                        <Popup>
                            <h3>Title: {spot.title}</h3>
                            <h3>{spot.price}$</h3>
                            <h3> Address: {spot.address}</h3>
                            <button type="button" onClick={() => handleBook(spot.id)}>Book This Spot</button>
                        </Popup>
                    </Marker>
                ))}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}