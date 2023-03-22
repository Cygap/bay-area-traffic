import MarkersLayer from "./MarkersLayer";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

//default coordinates of the Bay Area
export default function Map() {
  const defaultProps = {
    center: {
      lat: 37.7339524,
      lng: -122.0414691
    },
    zoom: 10
  };

  return (
    // Important! Always set the container height explicitly
    <>
      {process.env.REACT_APP_GOOGLEMAP_API_KEY ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultProps.center}
            zoom={defaultProps.zoom}>
            <MarkersLayer />
          </GoogleMap>
        </LoadScript>
      ) : (
        <div>error</div>
      )}
    </>
  );
}
