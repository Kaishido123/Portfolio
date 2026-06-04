await fetch('/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, text })
});
app.use(express.json());

app.post('/api/comments', async (req, res) => {
  // DBに保存
  res.json({ ok: true });
});

app.get('/api/comments', async (req, res) => {
  // DBから取得
  res.json(comments);
});
