# Sistema Legislativo Integrado

Sistema corporativo seguro e centralizado para gestão e geração de documentos legislativos (Proposituras, Atas e Documentos Oficiais/Muni).

## 🚀 Como instalar e rodar na sua máquina

### Pré-requisitos
- Node.js instalado (v16 ou superior)

### Passo a Passo

1. Extraia o conteúdo deste arquivo ZIP em uma pasta de sua escolha.
2. Abra o terminal / prompt de comando nessa pasta.
3. Instale as dependências executando:
   ```bash
   npm install
   ```
4. Inicialize o banco de dados SQLite com a conta de administrador padrão:
   ```bash
   npm run init-db
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
6. Acesse no navegador: `http://localhost:3000`

## 🔐 Credenciais Padrão de Acesso
- **Usuário:** `admin`
- **Senha:** `admin123`

## 📦 Como subir para o GitHub

1. No terminal da pasta do projeto, execute:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sistema Legislativo Integrado"
   ```
2. Crie um repositório no GitHub.
3. Vincule e envie o código:
   ```bash
   git remote add origin URL_DO_SEU_REPOSITORIO_GITHUB
   git branch -M main
   git push -u origin main
   ```
