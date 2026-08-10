import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RouteMap({ places }) {
  console.log("Places:", places);

  if (!places || places.length === 0) {
    return <h2>No Places</h2>;
  }

  return (
    <section className="routeMapSection">
      <h2>Today's Route</h2>

      <MapContainer
        center={[places[0].lat, places[0].lng]}
        zoom={14}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {places.map((place, index) => (
          <Marker key={index} position={[place.lat, place.lng]}>
            <Popup>{place.title}</Popup>
          </Marker>
        ))}
      
      </MapContainer>
    </section>
  );
}
