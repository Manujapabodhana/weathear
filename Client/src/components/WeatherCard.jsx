import { toC, toKm, toMps, toDeg, toClock, toDayTime } from "../lib/format";

const themes = ["theme-blue","theme-purple","theme-green","theme-orange","theme-red"];

export default function WeatherCard({ data, onOpen }){
  const theme = themes[data.id % themes.length]; // simple color variety
  return (
    <div className={`card ${theme}`} onClick={() => onOpen?.(data)} style={{cursor:"pointer"}}>
      <div className="cardTop">
        <div className="city">{data.name}, {data.country}</div>
        <div className="subtitle">{toDayTime(data.dt)}</div>

        <div className="cardGrid">
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:28, opacity:.9}}>☁️</div>
            <div style={{opacity:.95}}>{(data.description || "").replace(/\b\w/g,c=>c.toUpperCase())}</div>
          </div>

          <div className="divider" />

          <div>
            <div className="centerTemp">{toC(data.temp)}</div>
            <div style={{textAlign:"right",opacity:.95}}>
              <div>Temp Min: {toC(data.temp_min)}</div>
              <div>Temp Max: {toC(data.temp_max)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="metaRow">
        <div className="metaCol">
          <div className="metaItem"><span>Pressure:</span><span>{data.pressure ?? "-" } hPa</span></div>
          <div className="metaItem"><span>Humidity:</span><span>{data.humidity ?? "-" }%</span></div>
          <div className="metaItem"><span>Visibility:</span><span>{toKm(data.visibility)}</span></div>
        </div>
        <div className="metaCol">
          <div className="metaItem"><span>Wind:</span><span>{toMps(data.wind_speed)}</span></div>
          <div className="metaItem"><span>Direction:</span><span>{toDeg(data.wind_deg)}</span></div>
        </div>
        <div className="metaCol">
          <div className="metaItem"><span>Sunrise:</span><span>{toClock(data.sunrise)}</span></div>
          <div className="metaItem"><span>Sunset:</span><span>{toClock(data.sunset)}</span></div>
        </div>
      </div>
    </div>
  );
}
