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

// Load city codes from JSON
const citiesData = JSON.parse(fs.readFileSync("./cities.json", "utf-8"));
const cityIds = citiesData.List.map(c => c.CityCode);

const OWM_BASE = process.env.OWM_BASE_URL;  // <-- moved to .env
const API_KEY = process.env.OWM_API_KEY;

async function fetchWeatherForCity(id) {
  const key = `weather_${id}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const url = `${OWM_BASE}?id=${id}&appid=${API_KEY}&units=metric`;
  const { data } = await axios.get(url);

  const pruned = {
    id,
    name: data.name,
    description: data.weather?.[0]?.description ?? "",
    temp: data.main?.temp ?? null
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
