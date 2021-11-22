const express = require('express');
const authorsController = require('../controllers/authors.controller')
const router = express.Router();


router.get('/', (req, res) => {
    authorsController.getAllAuthors(req, res);
}).post('/', (req, res) => {
    authorsController.createAuthor(req, res);
}).delete('/:id', (req, res) => {
    authorsController.deleteAuthor(req, res)
})

module.exports = router;