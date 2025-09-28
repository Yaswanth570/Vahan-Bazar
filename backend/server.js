/*
  Vahan Bazar Backend (Express + MongoDB Atlas)
  - ES Module version (works with "type": "module")
  - Endpoints cover dashboard essentials: profile, saved bikes, listings, test rides, compare.
  - Use X-User-Id header or userId params to simulate auth in development.

  Setup:
  1) npm init -y
  2) npm i express mongoose cors morgan dotenv
  3) (optional) npm i -D nodemon
  4) Create .env in backend/ with:
       MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"
       PORT=5000
  5) Start:
       npx nodemon server.js   (or)   node server.js
*/

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Env
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || '';

// --- Mongoose Models (minimal fields to start) --- //
const { Schema, model, Types } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
  },
  { timestamps: true }
);
const User = model('User', UserSchema);

const BikeSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    fuelType: { type: String, enum: ['Petrol', 'Electric', 'Hybrid'], default: 'Petrol' },
  },
  { timestamps: true }
);
BikeSchema.index({ name: 'text', brand: 'text' });
const Bike = model('Bike', BikeSchema);

const SavedBikeSchema = new Schema(
  {
    // Store userId as string for flexibility
    userId: { type: String, required: true, index: true },
    // Store bikeId as string to support frontend sample IDs (e.g., '1', '2', ...)
    bikeId: { type: String, required: true },
  },
  { timestamps: true }
);
SavedBikeSchema.index({ userId: 1, bikeId: 1 }, { unique: true });
const SavedBike = model('SavedBike', SavedBikeSchema);

const ListingSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    status: { type: String, enum: ['active', 'sold', 'draft'], default: 'active' },
  },
  { timestamps: true }
);
const Listing = model('Listing', ListingSchema);

const TestRideSchema = new Schema(
  {
    // Store userId as string for flexibility (client-provided id)
    userId: { type: String, required: true, index: true },
    // Store bikeId as string to align with frontend sample IDs
    bikeId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  },
  { timestamps: true }
);
const TestRide = model('TestRide', TestRideSchema);

const CompareItemSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    bikeId: { type: Types.ObjectId, ref: 'Bike', required: true },
  },
  { timestamps: true }
);
CompareItemSchema.index({ userId: 1, bikeId: 1 }, { unique: true });
const CompareItem = model('CompareItem', CompareItemSchema);

// --- Helpers --- //
function getUserId(req) {
  // Prefer explicit param, else header/body for local dev.
  return req.params.userId || req.header('X-User-Id') || req.header('x-user-id') || req.body?.userId;
}

function isValidObjectId(id) {
  return Types.ObjectId.isValid(id);
}

// --- Routes --- //
app.get('/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Friendly root route so hitting "/" shows server status
app.get('/', (req, res) => {
  res.json({
    name: 'Vahan Bazar API',
    status: 'ok',
    health: '/health',
    apiIndex: '/api',
  });
});

// API index listing common endpoints
app.get('/api', (req, res) => {
  res.json({
    ok: true,
    endpoints: {
      health: '/health',
      users: {
        createOrGet: 'POST /api/users',
        byId: 'GET /api/users/:id'
      },
      bikes: {
        list: 'GET /api/bikes',
        create: 'POST /api/bikes',
        byId: 'GET /api/bikes/:id'
      },
      saved: {
        list: 'GET /api/users/:userId/saved',
        add: 'POST /api/users/:userId/saved { bikeId }',
        remove: 'DELETE /api/users/:userId/saved/:bikeId'
      },
      listings: {
        list: 'GET /api/users/:userId/listings',
        create: 'POST /api/users/:userId/listings',
        patch: 'PATCH /api/users/:userId/listings/:id'
      },
      testRides: {
        list: 'GET /api/users/:userId/test-rides',
        create: 'POST /api/users/:userId/test-rides { bikeId, date }',
        patch: 'PATCH /api/users/:userId/test-rides/:id { status }'
      },
      compare: {
        list: 'GET /api/users/:userId/compare',
        add: 'POST /api/users/:userId/compare { bikeId }',
        remove: 'DELETE /api/users/:userId/compare/:bikeId'
      }
    }
  });
});

// Users
app.post('/api/users', async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(200).json(existing);
    const user = await User.create({ name, email, avatar });
    res.status(201).json(user);
  } catch (err) { next(err); }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'invalid user id' });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'not found' });
    res.json(user);
  } catch (err) { next(err); }
});

// Bikes
app.post('/api/bikes', async (req, res, next) => {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json(bike);
  } catch (err) { next(err); }
});

app.get('/api/bikes', async (req, res, next) => {
  try {
    const { q, brand, limit = 20, page = 1 } = req.query;
    const filter = {};
    if (brand) filter.brand = brand;
    if (q) filter.$text = { $search: q };
    const docs = await Bike.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();
    res.json(docs);
  } catch (err) { next(err); }
});

app.get('/api/bikes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'invalid bike id' });
    const doc = await Bike.findById(id);
    if (!doc) return res.status(404).json({ error: 'not found' });
    res.json(doc);
  } catch (err) { next(err); }
});

// Saved Bikes
app.get('/api/users/:userId/saved', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ error: 'missing user id' });
    const saved = await SavedBike.find({ userId }).lean();
    res.json(saved);
  } catch (err) { next(err); }
});

app.post('/api/users/:userId/saved', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { bikeId } = req.body;
    if (!userId || !bikeId) return res.status(400).json({ error: 'invalid ids' });
    const item = await SavedBike.findOneAndUpdate(
      { userId, bikeId },
      { userId, bikeId },
      { upsert: true, new: true }
    );
    res.status(201).json(item);
  } catch (err) { next(err); }
});

app.delete('/api/users/:userId/saved/:bikeId', async (req, res, next) => {
  try {
    const { userId, bikeId } = req.params;
    if (!userId || !bikeId) return res.status(400).json({ error: 'invalid ids' });
    await SavedBike.deleteOne({ userId, bikeId });
    res.status(204).end();
  } catch (err) { next(err); }
});

// Listings
app.get('/api/users/:userId/listings', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!isValidObjectId(userId)) return res.status(400).json({ error: 'invalid user id' });
    const docs = await Listing.find({ userId }).lean();
    res.json(docs);
  } catch (err) { next(err); }
});

app.post('/api/users/:userId/listings', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!isValidObjectId(userId)) return res.status(400).json({ error: 'invalid user id' });
    const payload = { ...req.body, userId };
    const doc = await Listing.create(payload);
    res.status(201).json(doc);
  } catch (err) { next(err); }
});

app.patch('/api/users/:userId/listings/:id', async (req, res, next) => {
  try {
    const { userId, id } = req.params;
    if (!isValidObjectId(userId) || !isValidObjectId(id)) return res.status(400).json({ error: 'invalid ids' });
    const doc = await Listing.findOneAndUpdate({ _id: id, userId }, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: 'not found' });
    res.json(doc);
  } catch (err) { next(err); }
});

// Test Rides
app.get('/api/users/:userId/test-rides', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ error: 'missing user id' });
    const docs = await TestRide.find({ userId }).lean();
    res.json(docs);
  } catch (err) { next(err); }
});

app.post('/api/users/:userId/test-rides', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { bikeId, date } = req.body;
    // Remove validation that requires bikeId to be an ObjectId
    if (!userId) return res.status(400).json({ error: 'missing user id' });
    if (!bikeId) return res.status(400).json({ error: 'missing bike id' });
    const when = new Date(date);
    if (Number.isNaN(when.getTime())) return res.status(400).json({ error: 'invalid date' });
    const doc = await TestRide.create({ userId, bikeId, date: when });
    res.status(201).json(doc);
  } catch (err) { next(err); }
});

app.patch('/api/users/:userId/test-rides/:id', async (req, res, next) => {
  try {
    const { userId, id } = req.params;
    const { status } = req.body;
    if (!userId) return res.status(400).json({ error: 'missing user id' });
    if (!id) return res.status(400).json({ error: 'missing test ride id' });
    const doc = await TestRide.findOneAndUpdate({ _id: id, userId }, { status }, { new: true });
    if (!doc) return res.status(404).json({ error: 'not found' });
    res.json(doc);
  } catch (err) { next(err); }
});

// Compare
app.get('/api/users/:userId/compare', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    if (!isValidObjectId(userId)) return res.status(400).json({ error: 'invalid user id' });
    const docs = await CompareItem.find({ userId }).populate('bikeId');
    res.json(docs);
  } catch (err) { next(err); }
});

app.post('/api/users/:userId/compare', async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { bikeId } = req.body;
    if (!isValidObjectId(userId) || !isValidObjectId(bikeId)) return res.status(400).json({ error: 'invalid ids' });
    const count = await CompareItem.countDocuments({ userId });
    if (count >= 4) return res.status(400).json({ error: 'compare limit reached (4)' });
    const doc = await CompareItem.findOneAndUpdate(
      { userId, bikeId },
      { userId, bikeId },
      { upsert: true, new: true }
    );
    res.status(201).json(doc);
  } catch (err) { next(err); }
});

app.delete('/api/users/:userId/compare/:bikeId', async (req, res, next) => {
  try {
    const { userId, bikeId } = req.params;
    if (!isValidObjectId(userId) || !isValidObjectId(bikeId)) return res.status(400).json({ error: 'invalid ids' });
    await CompareItem.deleteOne({ userId, bikeId });
    res.status(204).end();
  } catch (err) { next(err); }
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error', details: err?.message });
});

async function start() {
  try {
    if (!MONGODB_URI) {
      console.warn('[WARN] MongoDB URI not set. Set MONGODB_URI or MONGO_URI in backend/.env');
    }
    await mongoose.connect(MONGODB_URI, { autoIndex: true });
    console.log('[DB] Connected');

    app.listen(PORT, () => {
      console.log(`[Server] Listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[FATAL] Failed to start', err);
    process.exit(1);
  }
}

start();
