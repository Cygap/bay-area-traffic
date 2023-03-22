import { PropsWithChildren, useContext } from "react";

import { eventType, MapContext } from "../providers/MapContext";
import { Event_Type } from "../providers/types";
import { TimeSlider } from "./Slider";

export default function EventFilters(props: PropsWithChildren) {
  const filterListStyles = { display: "flex", flexFlow: "column nowrap" };

  const state = useContext(MapContext);

  const handleChange = ({ target }: { target: HTMLInputElement }) => {
    state?.setFilters({
      ...state.filters,
      [target.name as Event_Type]: !state?.filters[target.name as Event_Type]
    });
  };
  return (
    <div>
      <h3>Filter events:</h3>
      <div style={filterListStyles}>
        {state?.eventsLoadingStatus === "done" ? (
          <>
            {Object.entries(eventType).map(([event, pic]) => {
              return (
                <label htmlFor={`${event}-filter`} key={event}>
                  <input
                    type="checkbox"
                    name={event}
                    id={`${event}-filter`}
                    checked={state?.filters[event as Event_Type]}
                    onChange={handleChange}
                  />
                  {event}
                  <span> </span>
                  <img src={pic} alt={event} width="25px" height="25px" />
                </label>
              );
            })}
            <div>
              <h4>event's last confirmation time:</h4>
              <TimeSlider />
            </div>
          </>
        ) : state?.eventsLoadingStatus === "error" ? (
          <div>
            Couldn't load traffic data... check API connection and try again...
          </div>
        ) : (
          <div>Loading traffic events...</div>
        )}
      </div>
    </div>
  );
}
