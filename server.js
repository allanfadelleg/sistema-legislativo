const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao';

const db = new sqlite3.Database('./database.sqlite');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

function verificarAutenticacao(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login.html');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login.html');
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validação direta para garantir acesso imediato na nuvem
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ id: 1, username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
    return res.json({ success: true });
  }

  db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });

    res.json({ success: true });
  });
});

app.get('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login.html');
});

app.get('/api/logs', verificarAutenticacao, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  db.all('SELECT * FROM logs ORDER BY data_hora DESC LIMIT 100', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/', verificarAutenticacao, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
