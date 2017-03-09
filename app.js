'use strict';
// Express dependancy
const express = require('express');
// Express instance
const app = express();

// Port
const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
.get((req, res) => {
    let responseJSON = {books:['Book 1','Book 2']};
    res.json(responseJSON);
});

app.use('/api', bookRouter);

app.get('/',(req, res)=> res.end('Index'));

app.listen(port, () => console.log(`Listening on ${port}`));