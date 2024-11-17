const express = require('express');
const mongoose = require('mongoose');
// const { Client } = require('pg');
const redis = require('redis');

const port = process.env.PORT || 4000;
const app = express();

// Connect to redis
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on('error', err => {
  console.error('Redis Client error:', err);
});
redisClient.on('connect', () => {
  console.log('Connected to Redis.');
});
redisClient.connect();

// Connect to MongoDB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '27017';
const DB_HOST = 'mongo';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.error('Error connecting to MongoDB');
  });

// // Connect to PostgreSQL
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '5432';
// const DB_HOST = 'postgres';

// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const pgClient = new Client({
//   connectionString: URI,
// });
// pgClient
//   .connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL');
//   })
//   .catch(() => {
//     console.error('Error connecting to PostgreSQL');
//   });

// Routes
app.get('/', (req, res) => {
  redisClient.set('name', 'John Doe from Redis');
  res.send('Hello World test!');
});

app.get('/name', async (req, res) => {
  const name = await redisClient.get('name');
  res.send(`Redis: ${name}`);
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port', port);
  console.log('Press Ctrl+C to quit.');
  if (process.env.NODE_ENV === 'development')
    console.log(`Open http://localhost:${port} in your browser.`);
});
