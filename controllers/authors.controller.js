const AuthorsModel = require('../models/author.model');
const booksModel = require('../models/book.model');
const createAuthor = (req, res) => {
    const { name, age } = req.body;
    const author = new AuthorsModel.Authors({
        name: name,
        age: age,
    })
    author.save((err, data) => {
        if (err) return res.status(404).send(err);
        return res.status(200).send(data);
    });
};
const getAllAuthors = (req, res) => {
    AuthorsModel.Authors.find({}, (err, data) => {
        if (err) return res.status(404).send(err)
        return res.status(200).json(data)
    })
};
const deleteAuthor = async(req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const books = await booksModel.Book.find({})
        books.forEach(async book => {
            book.author = book.author.filter(author => author.toString() !== id)
            await booksModel.Book.findByIdAndUpdate(book._id, book)

        })
        const deletedUser = await AuthorsModel.Authors.findByIdAndDelete(id)
        res.status(200).json(deletedUser)
    } catch (e) {
        res.status(400).send(e)
    }


}
module.exports = {
    createAuthor,
    getAllAuthors,
    deleteAuthor
}