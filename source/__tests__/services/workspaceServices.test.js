const workspaceService = require('../../services/workspaceServices')
jest.mock('@prisma/client', () => {
  return { PrismaClient: jest.fn(() => ({
    workspace: {
      findUnique: jest.fn(({ where }) =>
        where.id === 1 ? { id: 1, nome: 'Workspace' } : null
      ),
      findMany: jest.fn(({ where }) =>
        where.usuarioId === 1 ? [{ id: 1, nome: 'Workspace' }] : []
      ),
      create: jest.fn(({ data }) => ({ ...data, id: 55 }))
    }
  })) }
})

describe('workspaceServices', () => {
  test('listarWorkspacePorId', async () => {
    const ws = await workspaceService.listarWorkspacePorId(1)
    expect(ws).toHaveProperty('id', 1)
  })
  test('listarWorkspacesPorUsuario', async () => {
    const lista = await workspaceService.listarWorkspacesPorUsuario(1)
    expect(Array.isArray(lista)).toBe(true)
    expect(lista[0]).toHaveProperty('id', 1)
  })
  test('criarWorkspace', async () => {
    const ws = await workspaceService.criarWorkspace(1, 'Nome', 'Desc', 'Azul')
    expect(ws).toHaveProperty('id')
    expect(ws.nome).toBe('Nome')
  })
})
