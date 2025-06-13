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
    const [ano, mes, dia] = dataDeCompra.split('-');
    const dataCorrigida = new Date(Number(ano), Number(mes) - 1, Number(dia));
    
    const novoItem = await prisma.item.create({
        data: {
            nome,
            categoria,
            numeroSerie,
            dataDeCompra: dataCorrigida,
            valor,
            local,
            descricao,
            workspaceId
        }
    });

    console.log(novoItem);

    return novoItem;
}

async function atualizarItem(id, nome, descricao, local, categoria, numeroSerie, valor, dataDeCompra) {
    const [ano, mes, dia] = dataDeCompra.split('-');
    const dataCorrigida = new Date(Number(ano), Number(mes) - 1, Number(dia));

    const item = await prisma.item.update({
        where: { id },
        data: {
            nome,
            descricao,
            local,
            categoria,
            numeroSerie,
            valor,
            dataDeCompra: dataCorrigida
        }
    });

    return item;
}

async function registrarExclusao(itemId, motivo, responsavel) {
    try {
        const item = await prisma.item.findUnique({
            where: { id: itemId }
        })

        const exclusao = await prisma.exclusao.create({
            data: {
                nomeItem: item.nome,
                categoriaItem: item.categoria,
                numeroSerieItem: item.numeroSerie,
                motivo,
                responsavel,
                workspaceId: item.workspaceId,
                dataDeExclusao: new Date()
            }
        })

        const itemExcluido = await prisma.item.delete({
            where: { id: itemId }
        })

        return exclusao
    } catch (error) {
        console.error('Erro ao registrar exclusão:', error);
        throw new Error('Não foi possível registrar a exclusão do item.');
    }
}

module.exports = {
    listarItensPorWorkspace,
    criarItem,
    atualizarItem,
    registrarExclusao
};
