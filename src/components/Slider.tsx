//Basic slider constructor from the creator of this library: https://www.npmjs.com/package/react-compound-slider
//used it to showcase date-time filtering
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { Handle, Track, TooltipRail } from "./SliderComponents"; // example render components - source below

const sliderStyle: React.CSSProperties = {
  position: "relative",
  width: "80%",
  margin: "20% 10%"
};
const nowTime = Date.now();
const prevTime = Date.now() - 1000 * 60 * 60 * 24;
class TimeSlider extends React.Component {
  state = {
    values: [nowTime],
    update: [prevTime, nowTime],
    domain: [prevTime, nowTime]
  };

  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
    console.log(
      "%cSlider.tsx line:28 Date(values)",
      "color: #007acc;",
      new Date(values[0])
    );
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
