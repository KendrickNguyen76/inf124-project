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



