const booksModel = require('../models/book.model');


const getAllBooks = (req, res) => {
    try {
        booksModel.Book.find({}).populate({
            path: 'author',
            select: { 'name': 1, 'age': 1 }
        }).exec((err, data) => {
            if (err) return res.status(404).json(err)
            return res.status(200).json(data);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: err.message });
    }
}
const getAllBooksByYear = async(req, res) => {
    const { year } = req.params
    booksModel.Book.find({ yearPublication: { $eq: year } }, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const addNewBook = (req, res) => {
    const { name, ids } = req.body;
    const book = new booksModel.Book({
        name: name,
        author: [...ids],
    })
    book.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}

const deleteBook = (req, res) => {
    const { id } = req.params;
    booksModel.Book.findByIdAndDelete(id, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
const updateBook = (req, res) => {
    const { id } = req.params;
    const { name, author, yearPublication, language, rating } = req.body;
    booksModel.Book.findByIdAndUpdate(id, { name: name, author: author, yearPublication: yearPublication, language: language, rating: rating }, { new: true, runValidators: true }, (err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
}
module.exports = {
    getAllBooks,
    addNewBook,
    deleteBook,
    getAllBooksByYear,
    updateBook,
}