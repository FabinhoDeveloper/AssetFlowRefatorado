const { Router } = require("express")
const workspaceService = require("../services/workspaceServices.js")
const router = Router()

router.get("/", async (req, res) => {
    const workspaces = await workspaceService.listarWorkspacesPorUsuario(req.session.usuarioId)

    res.render("admin/workspaces", {
        titulo: "Painel Administrativo - Workspaces",
        workspaces
    })
})

router.post("/cadastro", async (req, res) => {
    const { nome, descricao, cor } = req.body
    const usuarioId = req.session.usuario.id
    console.log({ nome, descricao, cor, usuarioId })
    
    try {
        const workspace = await workspaceService.criarWorkspace(usuarioId, nome, descricao, cor)
        console.log(workspace)

        req.flash("sucesso", "Workspace criado com sucesso!")
        res.redirect("/admin/workspaces")
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect("/admin/workspaces")
    }
})

router.post("/editar", async (req, res) => {
    const { workspaceId, nome, descricao, cor } = req.body

    console.log({ mensagem: 'dados recebidos no controller', workspaceId, nome, descricao, cor })

    try {
        const workspace = await workspaceService.atualizarWorkspace(workspaceId, nome, descricao, cor)
        
        console.log({ mensagem: 'workspace recebido no controller', workspace })
        req.flash("sucesso", "Workspace atualizado com sucesso!")
        res.redirect("/admin/workspaces")
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect("/admin/workspaces")
    }
})

router.post("/excluir/:workspaceId", async (req, res) => {
    const { workspaceId } = req.params

    try {
        await workspaceService.excluirWorkspace(workspaceId)
        req.flash("sucesso", "Workspace excluído com sucesso!")
        res.redirect("/admin/workspaces")
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect("/admin/workspaces")
    }
})



module.exports = router
