const authService = require('../../services/authServices')
jest.mock('@prisma/client', () => {
  const usuario = { id: 1, email: 'test@email.com', senha: 'hash' }
  return { PrismaClient: jest.fn(() => ({
    usuario: {
      findUnique: jest.fn(({ where }) =>
        where.email === 'existe@email.com' ? usuario : null
      ),
      create: jest.fn(({ data }) => ({ ...data, id: 2 }))
    }
  })) }
})
jest.mock('bcrypt', () => ({
  hash: jest.fn(async () => 'hash'),
  compare: jest.fn(async (senha, hash) => senha === '123' && hash === 'hash')
}))

describe('authServices', () => {
  test('cadastrarUsuario - deve cadastrar com email novo', async () => {
    const usuario = await authService.cadastrarUsuario('Primeiro', 'Ultimo', 'novo@email.com', 'senha')
    expect(usuario).toHaveProperty('id')
    expect(usuario.email).toBe('novo@email.com')
  })
  test('cadastrarUsuario - deve falhar se email existe', async () => {
    await expect(authService.cadastrarUsuario('A', 'B', 'existe@email.com', 'senha'))
      .rejects.toThrow(/Email já está em uso/)
  })
  test('autenticarUsuario - sucesso', async () => {
    const usuario = await authService.autenticarUsuario('existe@email.com', '123')
    expect(usuario).toHaveProperty('id')
  })
  test('autenticarUsuario - usuario não encontrado', async () => {
    await expect(authService.autenticarUsuario('nada@email.com', '123')).rejects.toThrow()
  })
})
