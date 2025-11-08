import WeatherCard from "./WeatherCard";

export default function WeatherGrid({ list, onOpen }){
  return (
    <div className="container">
      <div className="grid">
        {list.map(c => <WeatherCard key={c.id} data={c} onOpen={onOpen} />)}
      </div>
      <div className="link">2021 Fidenz Technologies</div>
    </div>
  );
}
