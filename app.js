'use strict';
// Express dependancy
const express = require('express');
// Express instance
const app = express();

// Port
const port = process.env.PORT || 3000;

app.get('/',(req, res)=> res.end('Index'));

app.listen(port, () => console.log(`Listening on ${port}`));