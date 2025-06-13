const itemService = require('../../services/itemServices')
jest.mock('@prisma/client', () => {
  return { PrismaClient: jest.fn(() => ({
    item: {
      findMany: jest.fn(({ where }) =>
        where.workspaceId === 1 ? [{ id: 1, nome: 'Item 1', workspaceId: 1 }] : []
      ),
      create: jest.fn(({ data }) => ({ ...data, id: 99 }))
    }
  })) }
})

describe('itemServices', () => {
  test('listarItensPorWorkspace', async () => {
    const itens = await itemService.listarItensPorWorkspace(1)
    expect(Array.isArray(itens)).toBe(true)
    expect(itens[0]).toHaveProperty('workspaceId', 1)
  })
  test('criarItem', async () => {
    const item = await itemService.criarItem(1, 'Nome', 'Desc', 'Cat', 'NS', 'Local', 100, '2024-06-12')
    expect(item).toHaveProperty('id')
    expect(item.nome).toBe('Nome')
  })
})
