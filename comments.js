// Create web server 
// create a route for comments
// create a route for add-comment
// create a route for delete-comment
// create a route for edit-comment

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('error');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.post('/add-comment', (req, res) => {
    const newComment = req.body;
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('error');
        }
        const comments = JSON.parse(data);
        comments.push(newComment);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('error');
            }
            res.status(201).send('created');
        });
    });
});

app.delete('/delete-comment/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('error');
        }
        const comments = JSON.parse(data);
        const newComments = comments.filter((comment) => comment.id !== id);
        fs.writeFile('comments.json', JSON.stringify(newComments), (err) => {
            if (err) {
                res.status(500).send('error');
            }
            res.send('deleted');
        });
    });
});