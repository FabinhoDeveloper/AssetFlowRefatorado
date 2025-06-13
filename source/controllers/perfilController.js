const { Router } = require("express")
const perfilService = require("../services/perfilServices.js")
const router = Router()

router.get("/", (req, res) => {
    res.render("admin/perfil", {
        titulo: "Painel Administrativo - Perfil"
    })
})

router.post("/editar", async (req, res) => {
    const { primeiroNome, ultimoNome, email } = req.body
    const id = req.session.usuario.id

    try {
        const usuarioAtualizado = await perfilService.atualizarPerfil(id, primeiroNome, ultimoNome, email)
        
        req.session.usuario = usuarioAtualizado;
        req.flash("sucesso", "Perfil atualizado com sucesso!")
        res.redirect("/admin/perfil")
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect("/admin/perfil")
    }
})

module.exports = router
