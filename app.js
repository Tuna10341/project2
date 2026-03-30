const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'campusNutrition';
const USERS_COLLECTION = 'users';
const MENU_COLLECTION = 'menuSnapshots';

let db;
let usersCollection;
let menuCollection;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    
    db = client.db(DB_NAME);
    usersCollection = db.collection(USERS_COLLECTION);
    menuCollection = db.collection(MENU_COLLECTION);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

// ===================== USERS ROUTES =====================

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single user
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await usersCollection.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new user
app.post('/api/users', async (req, res) => {
  try {
    const { _id, email, display_name, dietary_goals, filter_presets, meal_plans } = req.body;
    
    if (!_id || !email || !display_name) {
      return res.status(400).json({ error: 'Missing required fields: _id, email, display_name' });
    }

    const newUser = {
      _id,
      email,
      display_name,
      created_at: new Date(),
      dietary_goals: dietary_goals || [],
      filter_presets: filter_presets || [],
      meal_plans: meal_plans || []
    };

    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created', insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { email, display_name, dietary_goals, filter_presets, meal_plans } = req.body;
    
    const updateData = {};
    if (email) updateData.email = email;
    if (display_name) updateData.display_name = display_name;
    if (dietary_goals) updateData.dietary_goals = dietary_goals;
    if (filter_presets) updateData.filter_presets = filter_presets;
    if (meal_plans) updateData.meal_plans = meal_plans;

    const result = await usersCollection.updateOne(
      { _id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated', modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const result = await usersCollection.deleteOne({ _id: req.params.id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===================== MENU SNAPSHOTS ROUTES =====================

// GET all menu snapshots
app.get('/api/menus', async (req, res) => {
  try {
    const menus = await menuCollection.find({}).limit(10).toArray();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single menu snapshot
app.get('/api/menus/:id', async (req, res) => {
  try {
    const menu = await menuCollection.findOne({ _id: req.params.id });
    if (!menu) {
      return res.status(404).json({ error: 'Menu snapshot not found' });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new menu snapshot
app.post('/api/menus', async (req, res) => {
  try {
    const { _id, menu_date, dining_location, meal_period, items, source_system } = req.body;
    
    if (!_id || !menu_date || !dining_location || !meal_period) {
      return res.status(400).json({ error: 'Missing required fields: _id, menu_date, dining_location, meal_period' });
    }

    const newMenu = {
      _id,
      menu_date: new Date(menu_date),
      fetched_at: new Date(),
      source_reference: req.body.source_reference || 'DOC_NEW',
      is_complete: req.body.is_complete || true,
      dining_location,
      meal_period,
      source_system: source_system || { source_system_id: 'src_001', name: 'DineOnCampus' },
      items: items || []
    };

    const result = await menuCollection.insertOne(newMenu);
    res.status(201).json({ message: 'Menu snapshot created', insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE menu snapshot
app.put('/api/menus/:id', async (req, res) => {
  try {
    const { menu_date, dining_location, meal_period, items, is_complete } = req.body;
    
    const updateData = {};
    if (menu_date) updateData.menu_date = new Date(menu_date);
    if (dining_location) updateData.dining_location = dining_location;
    if (meal_period) updateData.meal_period = meal_period;
    if (items) updateData.items = items;
    if (is_complete !== undefined) updateData.is_complete = is_complete;
    updateData.fetched_at = new Date();

    const result = await menuCollection.updateOne(
      { _id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Menu snapshot not found' });
    }

    res.json({ message: 'Menu snapshot updated', modifiedCount: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE menu snapshot
app.delete('/api/menus/:id', async (req, res) => {
  try {
    const result = await menuCollection.deleteOne({ _id: req.params.id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Menu snapshot not found' });
    }

    res.json({ message: 'Menu snapshot deleted', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
