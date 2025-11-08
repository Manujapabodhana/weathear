import WeatherCard from "./WeatherCard";

export default function WeatherDetail({ data, onBack }){
  if (!data) return null;
  return (
    <div className="container">
      <button className="btn" onClick={onBack}>← Back</button>
      <div style={{marginTop:12}}>
        <WeatherCard data={data} />
      </div>
      <div className="link">2021 Fidenz Technologies</div>
    </div>
  );
}
