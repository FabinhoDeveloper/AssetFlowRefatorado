const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listarExclusoesPorWorkspace(workspaceId) {
    const exclusoes = await prisma.exclusao.findMany({
        where: {
            workspaceId: workspaceId
        }
    });

    return exclusoes;
    
}

module.exports = {
    listarExclusoesPorWorkspace
};
