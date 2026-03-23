import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Weather API Proxy
  app.get("/api/weather", async (req, res) => {
    // In a real app, you'd fetch from OpenWeatherMap or similar
    // For now, returning realistic mock data for Naran
    res.json({
      temp: 12,
      condition: "Partly Cloudy",
      humidity: 45,
      wind: 10,
      location: "Naran, Kaghan Valley"
    });
  });

  // Mock Currency Converter
  app.get("/api/currency", (req, res) => {
    const { from, to, amount } = req.query;
    // Mock PKR to USD (approx 1 USD = 280 PKR)
    const rate = 0.0036; 
    const converted = Number(amount) * rate;
    res.json({ from, to, amount, converted, rate });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
