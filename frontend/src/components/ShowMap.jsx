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

export default function ShowMap({ availableSpots, handleBook }) {
  return (
    <div className="overflow-hidden rounded-xl border border-edge">
      <MapContainer
        center={[43.47408332564644, -80.5294431606201]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {availableSpots.map(spot => (
          <Marker key={spot.id} position={[Number(spot.lat), Number(spot.lon)]}>
            <Popup>
              <div className="text-center">
                <p className="font-medium">{spot.title}</p>
                <p className="text-sm">${spot.price}</p>
                <p className="text-sm">{spot.address}</p>
                <button
                  type="button"
                  onClick={() => handleBook(spot.id)}
                  className="mt-2 rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Book this spot
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
