const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

let posts = [];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const post = req.body;
    posts.push(post);
    res.status(201).json(post);
});

app.delete('/posts/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < posts.length) {
        posts.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});