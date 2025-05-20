// .env setup
require('dotenv').config();

// Supabase setup
const supabaseClient = require('./services/supabaseClient');
const supabase = supabaseClient.createSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Other constants
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')

});

app.get('/supabase_test', async (req, res) => {
  const { data, error } = await supabase
    .from('test_table')
    .select()

  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



