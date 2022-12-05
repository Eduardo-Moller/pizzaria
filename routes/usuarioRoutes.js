var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();

router.post("/endereco", async (req, res, next) => {
  if (
    req.body.cidade == "" ||
    req.body.bairro == "" ||
    req.body.rua == "" ||
    req.body.numero == "" ||
    req.body.complemento == ""
  ) {
    res.redirect("/endereco");
  } else {
    var verifica = await userController.vericaEndereco(req.session.login.id);
    if (verifica == true) {
      await userController.alterarEndereco(req.body, req.session.login.id);
    } else {
      await userController.insereEndereco(req.body, req.session.login.id);
    }
    res.redirect("/");
  }
});

router.get("/logOut", async (req, res, next) => {
  req.session.login = null;
  res.redirect("/");
});

router.post("/login", async (req, res, next) => {
  email = req.body.email;
  senha = req.body.senha;
  var usuarioArray = [email, senha];
  usuario = await userController.login(usuarioArray);
  if (typeof usuario == "object") {
    req.session.login = usuario;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
router.post("/registro", async (req, res, next) => {
  nome = req.body.nome;
  email = req.body.email;
  senha = req.body.senha;
  if (nome == "" || email == "" || senha == "") {
    res.redirect("/cadastro");
  }
  var usuarioArray = [nome, email, senha];
  usuario = await userController.registro(usuarioArray);
  if (typeof usuario == "object") {
    req.session.login = usuario;
    res.redirect("/");
  }
});

module.exports = router;
