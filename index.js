// proxy.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json({ limit: "5mb" }));

app.post("/proxy/login", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.salaksingha.com/api/v1/login/",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
});

app.post("/proxy/detect-datamatrix", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api-scan.salaksingha.com/detect-datamatrix",
      req.body,
      {
        maxBodyLength: Infinity,
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
});

app.post("/proxy/scanner", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.salaksingha.com/api/v1/scanner/",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
});

app.get("/proxy/scanner", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.salaksingha.com/api/v1/scanner/",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
});

app.post("/proxy/checkdevice", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.salaksingha.com/api/v1/checkdevice/",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Proxy failed", details: error.data });
  }
});

app.listen(3001, () => console.log("Proxy running on http://localhost:3001"));
