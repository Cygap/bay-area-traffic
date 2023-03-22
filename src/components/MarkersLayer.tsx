import { useContext } from "react";
import { MapContext } from "../providers/MapContext";
import { Marker } from "@react-google-maps/api";
import CONSTRUCTION from "../assets/construction-roller.svg";
import ROAD_CONDITION from "../assets/blocker.svg";
import SPECIAL_EVENT from "../assets/ferris-wheel.svg";
import WEATHER_CONDITION from "../assets/weather.svg";
import INCIDENT from "../assets/sports-car-crash.svg";
/*lat={37.7339524}
  lng={-122.0414691}

  CONSTRUCTION : planned road work - <a href="https://iconscout.com/icons/construction-roller" target="_blank">Construction roller Icon</a> by <a href="https://iconscout.com/contributors/arslan-haider" target="_blank">Technixus</a>
- SPECIAL_EVENT : special events (fair, <a href="https://iconscout.com/icons/ferris-wheel" target="_blank">Ferris Wheel Icon</a> by <a href="https://iconscout.com/contributors/iconscout">IconScout Store</a> on <a href="https://iconscout.com">IconScout</a>
sport event, etc.)
- INCIDENT : accidents and other <a href="https://iconscout.com/icons/warning" target="_blank">Warning Icon</a> by <a href="https://iconscout.com/contributors/lafs" target="_blank">LAFS</a>
unexpected events
- WEATHER_CONDITION : Weather
condition affecting the road
- ROAD_CONDITION : Status of the road -<a href="https://iconscout.com/icons/blocker" target="_blank">Blocker Icon</a> by <a href="https://iconscout.com/contributors/elegant-themes">Elegant Themes</a> on <a href="https://iconscout.com">IconScout</a>
that might affect travelers

*/
const eventType = {
  CONSTRUCTION,
  SPECIAL_EVENT,
  WEATHER_CONDITION,
  ROAD_CONDITION,
  INCIDENT
};
export default function MarkersLayer() {
  const state = useContext(MapContext);
  const markers = state ? state.markers : [];

  return (
    <>
      {markers.length ? (
        markers.map((marker) => {
          return (
            <Marker
              position={{
                lat: marker.geography.coordinates[1],
                lng: marker.geography.coordinates[0]
              }}
              key={marker.id}
              title={marker.event_type}
              icon={eventType[marker.event_type]}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}
