const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function cadastrarUsuario(primeiroNome, ultimoNome, email, senha) {
    const existe = await prisma.usuario.findUnique({ where: { email } });
    
    if (existe) {
        throw new Error("Email já está em uso");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
        data: {
            primeiroNome,
            ultimoNome,
            email,
            senha: senhaHash
        }
    });

    return usuario;
}

async function autenticarUsuario(email, senha) {
    const usuario = await prisma.usuario.findUnique({
        where: { email }
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        throw new Error('Usuário ou senha incorretos!');
    }

    return usuario;
}

module.exports = {
    cadastrarUsuario,
    autenticarUsuario
};
