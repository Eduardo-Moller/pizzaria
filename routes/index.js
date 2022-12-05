var express = require("express");
const userController = require("../controllers/userController");
const pizzaController = require("../controllers/pizzaController");
var router = express.Router();

router.get("/", userController.loginVerifica, async (req, res, next) => {
  var adm = await userController.vericaAdm(req.session.login.id);
  res.render("home", adm[0]);
});

router.get("/pedido", userController.loginVerifica, async (req, res, next) => {
  var verifica = await userController.vericaEndereco(req.session.login.id);
  if (verifica == false) {
    res.redirect("/endereco");
  }
  data = await pizzaController.pizzaDados();
  console.log(data)
  res.render("pedido", data);
});

router.get("/endereco", userController.loginVerifica, function (req, res, next) {
    res.render("endereco");
});

router.get("/admin", userController.loginVerifica, async (req, res, next) => {
  var adm = await userController.vericaAdm(req.session.login.id);
  if(adm[0].admim == 1){
    var lista = await pizzaController.listaPizza();
    var dados = {lista:lista}
    console.log(dados)
    res.render("admin", dados);
  }else{
    res.redirect("/")
  }
});

router.get("/select", function (req, res, next) {
  res.render("select");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/cadastro", function (req, res, next) {
  res.render("cadastro");
});

module.exports = router;
