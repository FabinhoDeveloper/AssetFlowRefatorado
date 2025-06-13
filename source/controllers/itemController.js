const { Router } = require("express")
const itemService = require("../services/itemServices.js")
const workspaceService = require("../services/workspaceServices.js")
const exclusaoService = require("../services/exclusaoServices.js")
const router = Router()

router.get("/:workspaceId", async (req, res) => {
    const { workspaceId } = req.params

    const workspace = await workspaceService.listarWorkspacePorId(workspaceId)
    const itens = await itemService.listarItensPorWorkspace(workspaceId)
    const exclusoes = await exclusaoService.listarExclusoesPorWorkspace(workspaceId)

    res.render("admin/itens", {
        titulo: "Painel Administrativo - Itens",
        itens,
        workspace,
        exclusoes
    })
})

router.post("/editar", async (req, res) => {
    const { itemId, nome, descricao, categoria, numeroSerie, local, valor, dataDeCompra } = req.body

    console.log( itemId, nome, descricao, categoria, numeroSerie, local, valor, dataDeCompra )
    try {
        const item = await itemService.atualizarItem(itemId, nome, descricao, local, categoria, numeroSerie, valor, dataDeCompra)

        req.flash("sucesso", "Item atualizado com sucesso!")
        res.redirect(`/admin/itens/${item.workspaceId}`)
    } catch (error) {
        req.flash("erro", error.message)
        res.redirect(`/admin/workspaces`)
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

router.post("/excluir", async (req, res) => {
  const { itemId, motivo, responsavel } = req.body;

  console.log({mensagem: 'Dados recebidos na controller', itemId, motivo, responsavel});

  try {
    const item = await itemService.registrarExclusao(itemId, motivo, responsavel);

    console.log({mensagem: 'Item excluído com sucesso', item});
    req.flash("sucesso", "Item excluído com sucesso!");
    res.redirect("/admin/workspaces");
  } catch (error) {
    req.flash("erro", error.message);
    res.redirect("/admin/workspaces");
  }
});



module.exports = router
