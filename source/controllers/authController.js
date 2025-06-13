const authService = require("../services/authServices.js")
const { Router } = require("express")
const router = Router()

// Login
router.get("/", (req, res) => {
    res.render("login", {
        titulo: "Asset Flow - Login",
    })
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

router.post("/login", async (req, res) => {
    const {email, senha} = req.body
    
    try {
        const usuario = await authService.autenticarUsuario(email, senha)
        req.session.usuario = usuario
        
        res.redirect("/admin/workspaces")
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect("/login")
    }
})


// Cadastro de Usuário
router.get("/cadastro", (req, res) => {
    res.render("cadastroNovoUsuario", {
        titulo: "Asset Flow - Cadastro de Usuário"
    })
})

router.post("/cadastro", async (req, res) => {
    const {primeiroNome, ultimoNome, email, senha} = req.body

    try {
        const usuario = await authService.cadastrarUsuario(primeiroNome, ultimoNome, email, senha)

        req.flash("sucesso", "Usuário cadastrado com sucesso!")
        req.session.usuario = usuario

        res.redirect("/admin/workspaces")
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect("/login/cadastro")
    }
})

module.exports = router
