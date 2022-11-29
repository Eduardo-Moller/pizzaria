var express = require('express');
const userController = require("../controllers/userController");
var router = express.Router();

/* GET home page. */

router.get('/', /*userController.loginVerifica,*/ function(req, res, next) {
  res.render('home');
});

router.get('/pedido', function(req, res, next) {
  res.render('pedido');
});

router.get('/endereco', function(req, res, next) {
  res.render('endereco');
});


//USER ROUTES

router.get('/select', function(req, res, next) {
  res.render('select');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});

router.post("/login", async (req, res, next) => {
  email = req.body.email;
  senha = req.body.senha;
  var UserArray = [email, senha];
  usuario = await userController.login(UserArray);
  console.log(usuario);
  if (typeof(usuario)=='object') {
    req.session.login = usuario;
    console.log(req.session.login);
    res.redirect('/home')
  } else {
    res.redirect('/login')
  }
});
router.post("/registro", async (req, res, next) => {
  nome = req.body.nome;
  email = req.body.email;
  senha = req.body.senha;
  console.log(nome);
  if(nome=="" || email=="" || senha==""){
    res.redirect('/cadastro')
  }
  var usuarioArray = [nome, email, senha];
  usuario = await userController.registro(usuarioArray);
  if(typeof(usuario)=='object'){
    req.session.login = usuario;
    res.redirect('/home')
  }
});

module.exports = router;
