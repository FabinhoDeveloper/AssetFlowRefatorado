const exclusaoService = require('../../services/exclusaoServices')
jest.mock('@prisma/client', () => {
  return { PrismaClient: jest.fn(() => ({
    exclusao: {
      findMany: jest.fn(({ where }) =>
        where.workspaceId === 1 ? [{ id: 1, workspaceId: 1 }] : []
      )
    }
  })) }
})

describe('exclusaoServices', () => {
  test('listarExclusoesPorWorkspace', async () => {
    const lista = await exclusaoService.listarExclusoesPorWorkspace(1)
    expect(Array.isArray(lista)).toBe(true)
    expect(lista[0]).toHaveProperty('workspaceId', 1)
  })
})
