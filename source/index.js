const express = require("express")
const path = require("path")
const { config } = require("dotenv")
const session = require("express-session")
const flash = require("connect-flash")
const layouts = require("express-ejs-layouts")

const app = express()
config({ path: path.resolve(__dirname, "../.env")} )

// Configuração do EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(layouts)
app.set("layout", path.join(__dirname, "views", "layouts", "layout"))

// Configurações dos Middlewares
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false
}))
app.use(flash())
app.use((req, res, next) => {
    res.locals.sucesso = req.flash("sucesso");
    res.locals.erro = req.flash("erro");
    res.locals.usuario = req.session.usuario;
    next();
});

// Configuração das Rotas
const publicController = require("./controllers/publicController.js")
const authController = require("./controllers/authController.js")

const workspaceController = require("./controllers/workspaceControllers.js")
const itemController = require("./controllers/itemController.js")
const perfilController = require("./controllers/perfilController.js")

const authMiddleware = require("./middlewares/authMiddleware.js")

app.use("/", publicController)
app.use("/login", authController)
app.use("/admin/workspaces", authMiddleware, workspaceController)
app.use("/admin/itens", authMiddleware, itemController)
app.use("/admin/perfil", authMiddleware, perfilController)

// Instancia do Servidor
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor rodando http://localhost:${PORT}`)
})