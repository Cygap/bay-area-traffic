import { PropsWithChildren } from "react";
import { eventType } from "./MarkersLayer";

export default function EventFilters(props: PropsWithChildren) {
  const filterListStyles = { display: "flex", flexFlow: "column nowrap" };
  return (
    <div>
      <h3>Filter events:</h3>
      <div style={filterListStyles}>
        {Object.entries(eventType).map(([event, pic]) => (
          <label htmlFor={`${event}-filter`} key={event}>
            <input
              type="checkbox"
              name={event}
              id={`${event}-filter`}
              checked
            />
            {event}
            <span> </span>
            <img src={pic} alt={event} width="25px" height="25px" />
          </label>
        ))}
      </div>
    </div>
  );
}
