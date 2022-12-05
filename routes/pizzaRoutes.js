var express = require("express");
const pizzaController = require("../controllers/pizzaController");
var router = express.Router();

router.post("/insere", async (req, res, next) => {
  if (
    req.body.massa == "0" ||
    req.body.borda == "0" ||
    req.body.sabor == undefined
  ) {
    res.redirect("/pedido");
  } else {
    await pizzaController.inserePedido(req.body, req.session.login.id);
    res.redirect("/");
  }
});

router.get("/apagar", async (req, res, next) => {
  await pizzaController.apagarPedido(req.query.id);
  res.send('apaggado com sucesso')
})

router.get("/alterarStatus", async (req, res, next) => {
  await pizzaController.alterarStatusPedido(req.query);
  res.send('alterado com sucesso')
});

router.get("/grafico", async (req, res, next) => {
  var grafico = await pizzaController.graficoPizzaVendida();
  res.send(grafico)
});


module.exports = router;
