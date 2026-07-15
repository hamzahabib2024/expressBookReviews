const axios = require("axios");
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({
            message: "Username and password are required"
        });
    }

    if (!isValid(username)) {
        return res.status(404).json({
            message: "User already exists!"
        });
    }

    users.push({
        username: username,
        password: password
    });

    return res.status(200).json({
        message: "User successfully registered. Now you can login."
    });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).json(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    return res.status(200).json(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {

    const author = req.params.author;

    const filteredBooks = Object.keys(books)
        .filter(key => books[key].author === author)
        .map(key => books[key]);

    return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {

    const title = req.params.title;

    const filteredBooks = Object.keys(books)
        .filter(key => books[key].title === title)
        .map(key => books[key]);

    return res.status(200).json(filteredBooks);
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    return res.status(200).json(books[isbn].reviews);
});


// Get all books using async-await with Axios
public_users.get('/async/books', async (req, res) => {
    try {
        const response = await axios.get("http://localhost:5000/");
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books"
        });
    }
});

// Get book by ISBN using async-await with Axios
public_users.get('/async/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;

        const response = await axios.get(
            `http://localhost:5000/isbn/${isbn}`
        );

        return res.status(200).json(response.data);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching book"
        });
    }
});

// Get book by ISBN using async-await with Axios
public_users.get('/async/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;

        const response = await axios.get(
            `http://localhost:5000/isbn/${isbn}`
        );

        return res.status(200).json(response.data);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching book"
        });
    }
});


// Get books by author using async-await with Axios
public_users.get('/async/author/:author', async (req, res) => {
    try {

        const author = req.params.author;

        const response = await axios.get(
            `http://localhost:5000/author/${author}`
        );

        return res.status(200).json(response.data);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books"
        });
    }
});


// Get books by title using async-await with Axios
public_users.get('/async/title/:title', async (req, res) => {
    try {

        const title = req.params.title;

        const response = await axios.get(
            `http://localhost:5000/title/${title}`
        );

        return res.status(200).json(response.data);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching books"
        });
    }
});



module.exports.general = public_users;