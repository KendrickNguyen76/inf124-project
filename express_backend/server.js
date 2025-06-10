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
const codeRoutes = require('./routes/codeRoutes');
const questionDiffRoutes = require('./routes/questionsDifficultyQuery');
const settingsRoutes = require('./routes/settingsRoutes');
const questionRoutes = require('./routes/questionRoutes');
const profileRoutes = require('./routes/profileRoutes');
const themeRoutes = require('./routes/themeRoutes');

// CORS configuration; setup origin
const prodOrigin = [process.env.ORIGIN_1, process.env.ORIGIN_2].filter(Boolean);
const devOrigin = ['http://localhost:5173'];
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigin : devOrigin;

app.use(cors({
  origin: allowedOrigins,
  credentials: true // optional: only if using cookies/auth
}));
app.use(express.json()); // Add this to parse JSON bodies
app.use('/login', authRoutes);
app.use('/register', regRoutes);
app.use('/code', codeRoutes);
app.use('/questionDiff', questionDiffRoutes);
app.use('/settings', settingsRoutes);
app.use('/question', questionRoutes);
app.use('/userprofile', profileRoutes);
app.use('/usertheme', themeRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



