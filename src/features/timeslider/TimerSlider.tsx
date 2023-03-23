import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { useDispatch, useSelector } from "react-redux";
import { Handle, Track, TooltipRail } from "./SliderComponents";
import { getSliderState, setMinTime, setUpdate } from "./TimeSliderSlice";

const sliderStyle: React.CSSProperties = {
  position: "relative",
  width: "80%",
  margin: "20% 10%"
};

export default function TimeSlider() {
  const { values, domain } = useSelector(getSliderState);
  //   const minTime = useSelector(getMinEventsUpdateTime);
  const dispatch = useDispatch();

  //   if (minTime !== Infinity) {
  //     dispatch(initStartTime(minTime));
  //   }
  const onUpdate = (update: ReadonlyArray<number>) => {
    dispatch(setUpdate(values[0]));
  };
  const onChange = (values: ReadonlyArray<number>) =>
    dispatch(setMinTime(values[0]));
  return (
    <div style={{ height: 40, width: "100%" }}>
      <Slider
        mode={1}
        step={1}
        domain={domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
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
