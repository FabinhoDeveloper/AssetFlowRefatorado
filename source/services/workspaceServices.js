const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listarWorkspacePorId(id) {
    const workspace = await prisma.workspace.findUnique({
        where: {
            id
        }
    });

    return workspace
}

async function listarWorkspacesPorUsuario(id) {
    const workspaces = await prisma.workspace.findMany({
        where: {
            usuarioId: id
        }
    });

    return workspaces;
}

async function criarWorkspace(usuarioId, nome, descricao, cor) {
    const novoWorkspace = await prisma.workspace.create({
        data: {
            nome,
            descricao,
            cor,
            usuarioId
        }
    });

    return novoWorkspace;
}

async function excluirWorkspace(id) {
    await prisma.workspace.delete({
        where: { id }
    });

    return workspace;   
}

async function atualizarWorkspace(workspaceId, nome, descricao, cor) {
    console.log({ mensagem: 'dados recebidos na service', workspaceId, nome, descricao, cor });
    
    const workspaceAtualizado = await prisma.workspace.update({
        where: { id: workspaceId },
        data: {
            nome,
            descricao,
            cor
        }
    });

    console.log({ mensagem: 'workspace atualizado na service', workspaceAtualizado });
    return workspaceAtualizado;
}

module.exports = {
    listarWorkspacePorId,
    listarWorkspacesPorUsuario,
    criarWorkspace,
    excluirWorkspace,
    atualizarWorkspace
}
