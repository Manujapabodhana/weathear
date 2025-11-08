// server/index.js
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

// Cache weather data for 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

// ---- Load city codes from cities.json ----
const citiesData = JSON.parse(fs.readFileSync("./cities.json", "utf-8"));
const cityIds = Array.isArray(citiesData)
  ? citiesData.map((c) => c.CityCode)
  : (citiesData.List || []).map((c) => c.CityCode);

const OWM_BASE = process.env.OWM_BASE_URL; // e.g. https://api.openweathermap.org/data/2.5/weather
const API_KEY = process.env.OWM_API_KEY;

// ---- Helper functions ----
function buildOWMUrl(params) {
  const url = new URL(OWM_BASE);
  url.search = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: "metric",
  }).toString();
  return url.toString();
}

function pickFields(data, extra = {}) {
  return {
    id: data.id,
    name: data.name,
    country: data.sys?.country ?? "",
    description: data.weather?.[0]?.description ?? "",
    temp: data.main?.temp ?? null,
    temp_min: data.main?.temp_min ?? null,
    temp_max: data.main?.temp_max ?? null,
    pressure: data.main?.pressure ?? null,
    humidity: data.main?.humidity ?? null,
    visibility: data.visibility ?? null,
    wind_speed: data.wind?.speed ?? null,
    wind_deg: data.wind?.deg ?? null,
    sunrise: data.sys?.sunrise ?? null,
    sunset: data.sys?.sunset ?? null,
    dt: data.dt ?? null,
    ...extra,
  };
}

async function fetchById(id) {
  const key = `weather_id_${id}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const { data } = await axios.get(buildOWMUrl({ id }));
  const pruned = pickFields(data, { id });
  cache.set(key, pruned);
  return pruned;
}

async function fetchByName(name) {
  const key = `weather_name_${name.toLowerCase()}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const { data } = await axios.get(buildOWMUrl({ q: name }));
  const pruned = pickFields(data);
  cache.set(key, pruned);
  return pruned;
}

// ---- Routes ----

// ✅ Health check
app.get("/test", (req, res) => res.json({ message: "Server is working ✅" }));

// ✅ Search by city name
app.get("/api/weather/by-name", async (req, res) => {
  try {
    const name = (req.query.name || "").trim();
    if (!name) return res.status(400).json({ error: "name is required" });
    const result = await fetchByName(name);
    res.json(result);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    const status = err?.response?.status === 404 ? 404 : 500;
    res.status(status).json({ error: "City not found" });
  }
});

// ✅ Get all cities from cities.json
app.get("/api/weather", async (req, res) => {
  try {
    const results = await Promise.all(cityIds.map(fetchById));
    res.json({ cities: results });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// ✅ Get weather by numeric city ID (fixed - no regex syntax issue)
app.get("/api/weather/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid city ID (must be a number)" });
    }

    const result = await fetchById(id);
    res.json(result);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

// ✅ Start server
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
