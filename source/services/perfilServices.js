const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listarPerfilPorId(id) {
    const perfil = await prisma.usuario.findUnique({
        where: {
            id
        }
    });

    return perfil;
}

async function atualizarPerfil(id, primeiroNome, ultimoNome, email) {
    const perfilAtualizado = await prisma.usuario.update({
        where: { id },
        data: {
            primeiroNome,
            ultimoNome,
            email
        }
    });

    console.log({ mensagem: 'Perfil atualizado na service', perfilAtualizado });
    return perfilAtualizado;
}

module.exports = {
    listarPerfilPorId,
    atualizarPerfil
};