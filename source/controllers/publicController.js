const { Router } = require("express")
const router = Router()

router.get("/", (req, res) => {
    res.render("home", {
        titulo: "Asset Flow - Página Inicial"
    })
})

module.exports = router
