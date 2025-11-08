import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherGrid from "./components/WeatherGrid";
import WeatherDetail from "./components/WeatherDetail";

export default function App() {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [err, setErr] = useState("");

  // load initial list (from cities.json via backend)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/weather");
        setCities(data.cities || []);
      } catch (e) {
        setErr("Failed to load weather");
      }
    })();
  }, []);

  // handle search by name -> open as detail or add to grid
  async function onSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    try {
      const { data } = await axios.get("/api/weather/by-name", {
        params: { name: q },
      });
      setSelected(data); // show the detail screen
      setErr("");
    } catch {
      setErr("No weather found for that name");
    }
  }

  return (
    <>
      <div className="bg-clouds" />
      <div className="container">
        <Header />
        <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
        {err && <p style={{ textAlign: "center", color: "#ffb4b4" }}>{err}</p>}
      </div>

      {selected ? (
        <WeatherDetail data={selected} onBack={() => setSelected(null)} />
      ) : (
        <WeatherGrid list={cities} onOpen={setSelected} />
      )}
    </>
  );
}
