# Asset Flow

Gerencie ativos, espaços e usuários de forma simples e segura.  
Sistema construído em Node.js + Express, com autenticação, controle de itens, perfis e workspaces.

## 🚀 Funcionalidades

- Autenticação de usuários (login/logout)
- Gerenciamento de Workspaces
- Cadastro e edição de Itens por Workspace
- Exclusão lógica de itens
- Perfil de usuário com edição de dados
- Visualização pública e painel administrativo

## 🛠️ Stack Principal

- *Node.js* / *Express*
- *Prisma ORM* (banco relacional)
- *Jest* (testes automatizados)
- *EJS* (views)

## 📁 Estrutura de Pastas
source/
├── controllers/
├── middlewares/
├── prisma/
├── public/
├── services/
├── views/
└── tests/
├── controllers/
└── services/

## ⚡ Como rodar localmente

1. *Clone o repositório*
    bash
    git clone https://github.com/seuusuario/asset-flow.git
    cd asset-flow
    

2. *Instale as dependências*
    bash
    npm install
    

3. *Configure o banco*
    - Renomeie .env.example para .env e ajuste as variáveis (exemplo com PostgreSQL).
    - Rode as migrations:
      bash
      npx prisma migrate dev
      

4. *Suba o sistema*
    bash
    npm start
    

5. *Acesse*
    - http://localhost:3000 (ou a porta definida no .env)

---

## 🧪 Rodando os Testes

O projeto já vem com uma bateria de testes unitários usando *Jest*. Para rodar:

```bash
npm test
