/* 
 * As it turns out, we only need to require this at the very beginning
 * By doing this, the rest of the project has access to it.
 */ 
require('dotenv').config();

// Supabase setup
const supabaseClient = require('./services/supabaseClient');
const supabase = supabaseClient.supabase

// Other constants
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const regRoutes = require('./routes/regRoutes');



const prodOrigin =[process.env.ORIGIN_1, process.env.ORIGIN_2]; // Replace with your production domain
const devOrigin = ['http://localhost:5173']; // Replace with your development domain
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.ORIGIN_1, process.env.ORIGIN_2].filter(Boolean)
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Add this to parse JSON bodies
app.use('/login', authRoutes);
app.use('/register', regRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
