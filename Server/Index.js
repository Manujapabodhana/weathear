import express from "express";
import axios from "axios";
import NodeCache from "node-cache";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 300 }); // cache for 5 minutes

// Add a route to clear cache if needed
app.get("/api/clear-cache", (req, res) => {
  cache.flushAll();
  res.json({ message: "Cache cleared" });
});

// Load city codes from JSON
const citiesData = JSON.parse(fs.readFileSync("./cities.json", "utf-8"));
const cities = citiesData.List;
const cityIds = cities.map((c) => c.CityCode);

const OWM_BASE = process.env.OWM_BASE_URL; // e.g. https://api.openweathermap.org/data/2.5/weather
const API_KEY = process.env.OWM_API_KEY;

async function fetchWeatherForCity(id) {
  const key = `weather_${id}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const url = `${OWM_BASE}?id=${id}&appid=${API_KEY}&units=metric`;
  const { data } = await axios.get(url);

  // --- expanded payload so the frontend can show all details ---
  const pruned = {
    id,

    // core
    name: data.name,
    description: data.weather?.[0]?.description ?? "",

    // temps
    temp: data.main?.temp ?? null,
    temp_min: data.main?.temp_min ?? null,
    temp_max: data.main?.temp_max ?? null,

    // atmosphere
    pressure: data.main?.pressure ?? null, // hPa
    humidity: data.main?.humidity ?? null, // %
    visibility: data.visibility ?? null, // meters

    // wind
    wind_speed: data.wind?.speed ?? null, // m/s
    wind_deg: data.wind?.deg ?? null, // degrees

    // sun/time
    dt: data.dt ?? null, // unix timestamp
    sunrise: data.sys?.sunrise ?? null, // unix (UTC)
    sunset: data.sys?.sunset ?? null, // unix (UTC)
    timezone: data.timezone ?? 0, // seconds offset from UTC
  };

  cache.set(key, pruned);
  return pruned;
}

app.get("/api/weather", async (req, res) => {
  try {
    const results = await Promise.all(cityIds.map(fetchWeatherForCity));
    res.json({ cities: results });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.get("/api/weather/:id", async (req, res) => {
  try {
    const result = await fetchWeatherForCity(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
