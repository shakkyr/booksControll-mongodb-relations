const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authors",
        required: false,
    }]
});
const Book = mongoose.model('Books', booksSchema);

module.exports = {
    Book
}