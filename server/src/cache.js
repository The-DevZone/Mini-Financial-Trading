// // src/cache.js
// const redis = require('redis');
// const { redisUrl } = require('./config');


// const client = redis.createClient({
//   url: redisUrl 
// });

// client.on('error', (err) => console.error('Redis Client Error', err));

// async function connect() {
//   await client.connect();
//   console.log('✅ Redis connected');
// }

// connect();

// module.exports = client;