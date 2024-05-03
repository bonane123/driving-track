import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
  width: "100vw",
  height: "100%",
};

const origin = {
  lat: -1.939826787816454,
  lng: 30.0445426438232,
};

function Map(props) {
  const {setDistance, setDuration} = props;
  const [directions, setDirections] = useState(null);

  async function calculatedDistance() {
    // eslint-disable-next-line no-undef
    const routeDirections = new google.maps.DirectionsService();
    const result = await routeDirections.route({
      origin: "Nyabugogo bus park",
      destination: "Kimironko bus park",
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  }

  const { isLoaded } = useJsApiLoader({
    // This is environment variable, but to avoid a darkened map, or 'negative' Street View image,
    // watermarked with the text "for development purposes only", may be displayed let expose API_KEY
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    googleMapsApiKey: "AIzaSyDdWorWelg_egr0y4C_S_d-MYwQQCVq2oc",
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(origin);
    map.fitBounds(bounds);

    setMap(map);
    calculatedDistance();
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={origin}
      zoom={12}
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
      {directions && <DirectionsRenderer directions={directions}/>}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
