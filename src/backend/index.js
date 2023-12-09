const { Pool, Client } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "webmappsu",
  password: "Yai050644@",
  port: 5432,
});

client.connect();

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.json({ currentTime: result.rows[0].now });
  } catch (err) {
    console.error("Error in client query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getlist", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM public.webmappsu ORDER BY id ASC");
    res.json({ data: result.rows });
  } catch (err) {
    console.error("Error in client query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
