const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
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

  // Hash pré-gerado para a senha 'admin123' (bcrypt)
  const senhaHash = '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
  
  db.run(`INSERT OR REPLACE INTO usuarios (id, username, password, role) VALUES (1, 'admin', ?, 'admin')`, [senhaHash], (err) => {
    if (!err) {
      console.log('Banco de dados inicializado com sucesso! Usuário: admin / Senha: admin123');
    } else {
      console.error('Erro ao inserir usuário:', err);
    }
  });
});
db.close();
