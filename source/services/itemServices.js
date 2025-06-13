const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listarItensPorWorkspace(workspaceId) {
    const itens = await prisma.item.findMany({
        where: {
            workspaceId: workspaceId
        }
    });

    return itens;
}

async function criarItem(workspaceId, nome, descricao, categoria, numeroSerie, local, valor, dataDeCompra) {
   console.log(workspaceId, nome, descricao, categoria, numeroSerie, local, valor, dataDeCompra);

    const novoItem = await prisma.item.create({
        data: {
            nome,
            categoria,
            numeroSerie,
            dataDeCompra: new Date(dataDeCompra),
            valor,
            local,
            descricao,
            workspaceId
        }
    });

    console.log(novoItem);

    return novoItem;
}

async function excluirItem(id) {
    const item = await prisma.item.delete({
        where: { id }
    });

    return item
}

async function atualizarItem(id, nome, descricao, local, categoria, numeroSerie, valor, dataDeCompra) {
    const item = await prisma.item.update({
        where: { id },
        data: {
            nome,
            descricao,
            local,
            categoria,
            numeroSerie,
            valor,
            dataDeCompra
        }
    });

    return item;
}

module.exports = {
    listarItensPorWorkspace,
    criarItem,
    excluirItem,
    atualizarItem
};
