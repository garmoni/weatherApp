import * as d3 from "d3";

export const CurveWeather = ({ time, width, height, mainTemp, units}) => {

  const getX = d3.scaleBand()
    .domain(time.map(item => item.name))
    .range([0, width]);

  const getY = d3.scaleLinear()
    .domain([0, 40])
    .range([height, 0]);

  const getXAxis = ref => {
    const xAxis = d3.axisBottom(getX)
    d3.select(ref).call(xAxis);
  };
  
  const areaPath = d3.area()
    .x(d => getX(d.name) + getX.bandwidth() / 4)
    .y0(d => getY(Math.abs(d.value)))
    .y1(() => getY(0))
    .curve(d3.curveMonotoneX)(time)

  return (
    <div className="scale-block">
      <svg
        className="svg"
        width={width}
        height={height}
      >
        <g
          className="axis xAxis"
          ref={getXAxis}
          transform={`translate(0, 45)`}
        />
        <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={mainTemp > 0 ? "#FF715B" : "#5B8CFF"} />
          <stop offset="100%" stopColor="#FFF4F4" />
        </linearGradient>
        <path
          fill="url(#linear-gradient)"
          d={areaPath}
          opacity={0.3}
        />
        <g >
        {time.map((item, index) => {
          return (
            <g className="temp-points" key={index}>
              <text
                fill="#C5C5C5"
                x={getX(item.name) + getX.bandwidth() / 2}
                y={getY(Math.abs(item.value)) - 5}
                textAnchor="middle"
              >
                {units === 'metric' ? Math.round(item.value) : Math.round(item.value * 1.8 + 32)}
              </text>
            </g>
          );
        })}
        </g>
      </svg>
    </div>
  );
}
