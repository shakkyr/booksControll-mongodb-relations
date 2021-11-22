const mongoose = require('mongoose');

const authorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const Authors = mongoose.model('Authors', authorsSchema);

module.exports = {
    Authors
}