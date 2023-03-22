//Basic slider constructor from the creator of this library: https://www.npmjs.com/package/react-compound-slider
//used it to showcase date-time filtering
import * as React from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { Handle, Track, TooltipRail } from "./SliderComponents";
import { MapContext } from "../providers/MapContext";

const sliderStyle: React.CSSProperties = {
  position: "relative",
  width: "80%",
  margin: "20% 10%"
};
const nowTime = Date.now();
const prevTime = Date.now() - 1000 * 60 * 60 * 1;
class TimeSlider extends React.Component {
  state = {
    values: [prevTime],
    update: [prevTime, nowTime],
    domain: [prevTime, nowTime]
  };
  static contextType = MapContext;
  context!: React.ContextType<typeof MapContext>;
  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
    const context = this.context;
    if (context?.filters) {
      context.setFilters({ ...context.filters, MIN_DATE: values[0] });
    }
  };

  render() {
    const {
      state: { values, domain }
    } = this;

    return (
      <div style={{ height: 40, width: "100%" }}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}>
          <Rail>{(railProps) => <TooltipRail {...railProps} />}</Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    isActive={handle.id === activeHandleID}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    );
  }
}

export { TimeSlider };
