const { Router } = require("express")
const itemService = require("../services/itemServices.js")
const workspaceService = require("../services/workspaceServices.js")
const router = Router()

router.get("/:workspaceId", async (req, res) => {
    const { workspaceId } = req.params

    const workspace = await workspaceService.listarWorkspacePorId(workspaceId)
    const itens = await itemService.listarItensPorWorkspace(workspaceId)

    res.render("admin/itens", {
        titulo: "Painel Administrativo - Itens",
        itens,
        workspace
    })
})

router.post("/admin/editar/:itemId", async (req, res) => {
    const { itemId } = req.params
    const { nome, descricao, categoria, numeroSerie, local, valor, dataDeCompra } = req.body

    try {
        const item = await itemService.atualizarItem(itemId, nome, descricao, local, categoria, numeroSerie, valor, dataDeCompra)

        req.flash("sucesso", "Item atualizado com sucesso!")
        res.redirect(`/admin/itens/${item.workspaceId}`)
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect(`/admin/itens/${item.workspaceId}`)
    }
})

router.post("/cadastro/:workspaceId", async (req, res) => {
    const { workspaceId } = req.params
    const { nome, descricao, categoria, numeroSerie, local, valor, dataDeCompra } = req.body

    try {
        const item = await itemService.criarItem(workspaceId, nome, descricao, categoria, numeroSerie, local, valor, dataDeCompra)

        req.flash("sucesso", "Item criado com sucesso!")
        res.redirect(`/admin/itens/${workspaceId}`)
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect(`/admin/itens/${workspaceId}`)
    }
})

module.exports = router
