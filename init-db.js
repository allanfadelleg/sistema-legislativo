const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(async () => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'assessor'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    usuario_nome TEXT,
    modulo TEXT,
    acao TEXT,
    detalhes TEXT,
    ip_origem TEXT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  const hash = await bcrypt.hash('admin123', 10);
  db.run(`INSERT OR IGNORE INTO usuarios (id, username, password, role) VALUES (1, 'admin', '${hash}', 'admin')`, (err) => {
    if (!err) console.log('Banco de dados inicializado com sucesso! Usuário padrão: admin / admin123');
  });
});
db.close();
