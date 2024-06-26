import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import DriverRoutes from "./DriverRoutes";
import CarMarker from "./images/bus.png";

const containerStyle = {
  width: "100vw",
  height: "100%",
};

const origin = {
  lat: -1.939826787816454,
  lng: 30.0445426438232,
};

function Map() {
  const [directions, setDirections] = useState(null);
  const [position, setPosition] = useState(origin);


  const waypoints = [
    { location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
    { location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
    { location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
    { location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
    { location: { lat: -1.9487480402200394, lng: 30.126596781356923 } },
  ];

  // Create routes from origin to destination
  async function calculatedDistance() {
    const routeDirections = new window.google.maps.DirectionsService();
    const result = await routeDirections.route({
      origin: "Nyabugogo bus park",
      destination: "Kimironko bus park",
      travelMode: window.google.maps.TravelMode.DRIVING,
      waypoints: waypoints,
    });
    setDirections(result);
  }

  // Load google maps by mounting and unmounting with GOOGLE_MAP_API_KEY
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const [, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(origin);
    map.fitBounds(bounds);
    setMap(map);
    calculatedDistance();
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, [setMap]);


  return isLoaded ? (
    <>
      <DriverRoutes
        directions={directions}  setPosition={setPosition} 
      />
      <div className="container map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {!directions && <Marker position={origin} />}
        {directions && <DirectionsRenderer directions={directions} />}
        {directions && (
                <Marker
                    position={position}
                    icon={{
                        url: CarMarker, 
                        scaledSize: new window.google.maps.Size(80, 50), 
                    }}
                />
            )}
      </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Map;
