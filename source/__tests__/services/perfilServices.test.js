const perfilService = require('../../services/perfilServices')
jest.mock('@prisma/client', () => {
  return { PrismaClient: jest.fn(() => ({
    usuario: {
      findUnique: jest.fn(({ where }) =>
        where.id === 1 ? { id: 1, email: 'email@test.com' } : null
      ),
      update: jest.fn(({ where, data }) => ({ ...data, id: where.id }))
    }
  })) }
})

describe('perfilServices', () => {
  test('listarPerfilPorId', async () => {
    const perfil = await perfilService.listarPerfilPorId(1)
    expect(perfil).toHaveProperty('id', 1)
  })
  test('atualizarPerfil', async () => {
    const novo = await perfilService.atualizarPerfil(1, 'Novo', 'Nome', 'email@novo.com')
    expect(novo).toHaveProperty('email', 'email@novo.com')
  })
})
