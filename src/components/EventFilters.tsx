import { useContext } from "react";
import { eventType, MapContext } from "../providers/MapContext"; //eventType - object with keys of Event_Type and respective values as svg icons.
import { Event_Type } from "../providers/types"; //API contract's event_type values
import { TimeSlider } from "./Slider";
/**
 * The component controlls filtering elements and fires setFilters function received from context
 * depending on filtering elements state.
 * Filtering elements' checked state is stored in context's filters object.
 * Note! Time slider filter state and setState is done from another component (TimeSlider)
 * @returns {React.element} <div> element with children elements to display available filters for the dataset
 */
export default function EventFilters() {
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
      {state?.eventsLoadingStatus === "done" ? (
        <></>
      ) : state?.eventsLoadingStatus === "idle" ? (
        <div>preparing next batch...</div>
      ) : state?.eventsLoadingStatus === "loading" ? (
        <div>Loading traffic events...</div>
      ) : (
        <div>
          Couldn't load traffic data... check API connection and try again...
        </div>
      )}
      <div style={filterListStyles}>
        <>
          {
            //filling in the filter elements according to API contract's event_type values.
            Object.entries(eventType).map(([event, pic]) => {
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
            })
          }
          <div>
            <h4>event's last confirmation time:</h4>
            <TimeSlider />
          </div>
        </>
      </div>
    </div>
  );
}
