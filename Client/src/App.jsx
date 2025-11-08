import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherGrid from "./components/WeatherGrid";
import WeatherDetail from "./components/WeatherDetail";

export default function App(){
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try{
        const { data } = await axios.get("/api/weather");
        setCities(data.cities || []);
      }catch(e){
        setErr("Failed to load weather");
      }
    })();
  },[]);

  return (
    <>
      <div className="bg-clouds" />
      <div className="container">
        <Header />
        {/* Hide SearchBar if you want to strictly follow "no Add City" */}
        <SearchBar />
        {err && <p style={{textAlign:"center", color:"#ffb4b4"}}>{err}</p>}
      </div>

      {selected
        ? <WeatherDetail data={selected} onBack={() => setSelected(null)} />
        : <WeatherGrid list={cities} onOpen={setSelected} />
      }
    </>
  );
}
