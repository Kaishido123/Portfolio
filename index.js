const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let comments = [
  { name: '匿名', text: 'サイトを見に来ました！', time: '2026/06/04 22:00' },
  { name: 'Shi', text: 'ありがとう！', time: '2026/06/04 22:05' }
];

app.get('/api/comments', (req, res) => {
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  const name = (req.body.name || '匿名').trim();
  const text = (req.body.text || '').trim();

  if (!text) {
    return res.status(400).json({ error: 'コメントが空です' });
  }

  const now = new Date();
  const time = now.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const comment = { name, text, time };
  comments.unshift(comment);
  res.status(201).json(comment);
});

app.delete('/api/comments/:index', (req, res) => {
  const index = Number(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= comments.length) {
    return res.status(400).json({ error: '無効なindexです' });
  }

  comments.splice(index, 1);
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
