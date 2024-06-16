const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
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
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

const port = 3000;
const host = '0.0.0.0'; // 모든 네트워크 인터페이스에서 접근 가능하도록 설정
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
