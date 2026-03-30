const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const URI = "mongodb://localhost:27017";
const DB = "campusNutrition";
let users, menus;

MongoClient.connect(URI).then(client => {
  const db = client.db(DB);
  users = db.collection("users");
  menus = db.collection("menuSnapshots");
  app.listen(3000, () => console.log("Running on http://localhost:3000"));
});

// USERS
app.get("/api/users", async (req, res) => {
  res.json(await users.find().toArray());
});

app.get("/api/users/:id", async (req, res) => {
  const user = await users.findOne({ _id: req.params.id });
  user ? res.json(user) : res.status(404).json({ error: "Not found" });
});

app.post("/api/users", async (req, res) => {
  const { _id, email, display_name } = req.body;
  if (!_id || !email || !display_name)
    return res.status(400).json({ error: "Missing fields" });
  await users.insertOne({ _id, email, display_name, created_at: new Date(), dietary_goals: [], filter_presets: [], meal_plans: [], consumption_entries: [] });
  res.status(201).json({ message: "Created" });
});

app.put("/api/users/:id", async (req, res) => {
  const { email, display_name } = req.body;
  const result = await users.updateOne({ _id: req.params.id }, { $set: { email, display_name } });
  result.matchedCount ? res.json({ message: "Updated" }) : res.status(404).json({ error: "Not found" });
});

app.delete("/api/users/:id", async (req, res) => {
  const result = await users.deleteOne({ _id: req.params.id });
  result.deletedCount ? res.json({ message: "Deleted" }) : res.status(404).json({ error: "Not found" });
});

// MENU SNAPSHOTS
app.get("/api/menus", async (req, res) => {
  res.json(await menus.find().toArray());
});

app.get("/api/menus/:id", async (req, res) => {
  const menu = await menus.findOne({ _id: req.params.id });
  menu ? res.json(menu) : res.status(404).json({ error: "Not found" });
});

app.post("/api/menus", async (req, res) => {
  const { _id, menu_date, dining_location, meal_period, items } = req.body;
  if (!_id || !menu_date || !dining_location || !meal_period)
    return res.status(400).json({ error: "Missing fields" });
  await menus.insertOne({
    _id,
    menu_date: new Date(menu_date),
    fetched_at: new Date(),
    is_complete: false,
    dining_location,
    meal_period,
    source_system: { name: "DineOnCampus" },
    items: items || []
  });
  res.status(201).json({ message: "Created" });
});

app.put("/api/menus/:id", async (req, res) => {
  const { is_complete } = req.body;
  const result = await menus.updateOne({ _id: req.params.id }, { $set: { is_complete } });
  result.matchedCount ? res.json({ message: "Updated" }) : res.status(404).json({ error: "Not found" });
});

app.delete("/api/menus/:id", async (req, res) => {
  const result = await menus.deleteOne({ _id: req.params.id });
  result.deletedCount ? res.json({ message: "Deleted" }) : res.status(404).json({ error: "Not found" });
});