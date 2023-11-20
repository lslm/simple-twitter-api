const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const cors = require('cors')

const app = express();
const PORT = 3000;
const DATA_FILE = 'posts.json';

app.use(cors())
app.use(bodyParser.json());

// Middleware para carregar os posts do arquivo JSON
app.use(async (req, res, next) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    req.posts = JSON.parse(data);
  } catch (error) {
    req.posts = [];
  }
  next();
});

// Rota para obter todos os posts
app.get('/posts', (req, res) => {
  const posts = req.posts.sort((a, b) => {
    return b.id - a.id
  })

  console.log(posts)
  res.json(posts);
});

// Rota para obter um post específico por ID
app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const post = req.posts.find((p) => p.id === postId);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Rota para criar um novo post
app.post('/posts', (req, res) => {
  const newPost = req.body;
  newPost.id = Date.now().toString(); // Gera um ID único usando a timestamp
  newPost.starsCount = 0

  req.posts.push(newPost);

  // Salva os posts no arquivo JSON
  fs.writeFile(DATA_FILE, JSON.stringify(req.posts, null, 2))
    .then(() => res.json(newPost))
    .catch((error) => res.status(500).json({ error: 'Failed to save posts' }));
});

// Rota para atualizar um post existente por ID
app.put('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  const index = req.posts.findIndex((p) => p.id === postId);

  if (index !== -1) {
    req.posts[index] = { ...req.posts[index], ...updatedPost };

    // Salva os posts no arquivo JSON
    fs.writeFile(DATA_FILE, JSON.stringify(req.posts, null, 2))
      .then(() => res.json(req.posts[index]))
      .catch((error) => res.status(500).json({ error: 'Failed to save posts' }));
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Rota para atualizar a quantidade de favoritos de um post
app.put('/posts/:id/favorite', (req, res) => {
  const postId = req.params.id;
  const index = req.posts.findIndex((p) => p.id === postId);

  if (index !== -1) {
    const post = req.posts[index]
    post.starsCount++
    req.posts[index] = { ...req.posts[index], ...post };

    // Salva os posts no arquivo JSON
    fs.writeFile(DATA_FILE, JSON.stringify(req.posts, null, 2))
      .then(() => res.json(req.posts[index]))
      .catch((error) => res.status(500).json({ error: 'Failed to save posts' }));
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Rota para excluir um post por ID
app.delete('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const index = req.posts.findIndex((p) => p.id === postId);

  if (index !== -1) {
    const deletedPost = req.posts.splice(index, 1)[0];

    // Salva os posts no arquivo JSON
    fs.writeFile(DATA_FILE, JSON.stringify(req.posts, null, 2))
      .then(() => res.json(deletedPost))
      .catch((error) => res.status(500).json({ error: 'Failed to save posts' }));
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
