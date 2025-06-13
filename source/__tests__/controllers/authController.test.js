const authController = require('../../controllers/authController')
// Controller tests geralmente precisam de supertest/express ou mock de req/res
// Aqui, exemplo básico mockando req, res
describe('authController rotas', () => {
  test('GET / deve renderizar login', () => {
    const req = {}
    const res = { render: jest.fn() }
    authController.stack.find(r => r.route.path === '/').route.stack[0].handle(req, res)
    expect(res.render).toHaveBeenCalled()
  })
})
