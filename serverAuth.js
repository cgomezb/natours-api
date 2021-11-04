require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.AUTH_PORT || 3030;

app.listen(port, () => {
  console.log(`Listening to requets on port ${port}...`);
});
