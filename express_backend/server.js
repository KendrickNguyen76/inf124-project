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

// CORS configuration; setup origin
const prodOrigin = [process.env.ORIGIN_1, process.env.ORIGIN_2].filter(Boolean);
const devOrigin = ['http://localhost:5173'];
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigin : devOrigin;

app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies
app.use('/login', authRoutes);
app.use('/register', regRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



