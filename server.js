const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())
app.use(cors());

app.use('/api/books', require('./routes/books.route'));
app.use('/api/authors', require('./routes/authors.route'));

mongoose.connect('mongodb://localhost/dbBooks', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});
app.listen(process.env.PORT || 4001, () => console.log(`Listening on port ${process.env.PORT || 4001}`));