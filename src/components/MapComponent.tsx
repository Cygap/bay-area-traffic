import MarkersLayer from "./MarkersLayer";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import EventFilters from "./EventFilters";
import ReactDOM from "react-dom";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

//creating plain HTML element to push inside GoogleMaps native API and then nest a EventFilters component inside
const controlButtonDiv = document.createElement("div");

/**
 * this handler function is used to add custom control element (EventFilters) to the controls' layer of google map
 * @param map @type {google.maps.Map} - map object from google API
 */

const handleOnLoad = (map: google.maps.Map) => {
  map &&
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      controlButtonDiv
    );
};
/**
 * Google map "wrapper" component
 * @returns {React.element} - depending of the environment either displays the map or an error
 */
export default function Map() {
  //default coordinates of the Bay Area
  const defaultProps = {
    center: {
      lat: 37.7339524,
      lng: -122.0414691
    },
    zoom: 10
  };

  const filterStyles = {
    backgroundColor: "rgb(245, 245, 245)",
    opacity: "0.85"
  };

  return (
    // Important! Always set the container height explicitly
    <>
      {process.env.REACT_APP_GOOGLEMAP_API_KEY ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultProps.center}
            zoom={defaultProps.zoom}
            onLoad={(map) => handleOnLoad(map)}>
            {ReactDOM.createPortal(
              <div style={filterStyles}>
                <EventFilters />
              </div>,
              controlButtonDiv
            )}

            <MarkersLayer />
          </GoogleMap>
        </LoadScript>
      ) : (
        <div>error, no API key</div>
      )}
    </>
  );
}
