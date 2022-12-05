const mysql = require("./mysql");

async function pizzaDados() {
  sql = `SELECT * FROM bordas`;
  var bordas = await mysql.query(sql);
  sql = `SELECT * FROM massas`;
  var massas = await mysql.query(sql);
  sql = `SELECT * FROM sabores`;
  var sabores = await mysql.query(sql);
  return { bordas, massas, sabores };
}

async function inserePedido(data, id) {
  var sabores = data.sabor;

  sql = `INSERT INTO pizza (idBordas, idMassas) VALUES('${data.borda}', '${data.massa}');`;
  var pizza = await mysql.query(sql);
  var idPizza = pizza.insertId;

  for (var i = 0; i < sabores.length; i++) {
    sql = `INSERT INTO pizza_sabor (idPizza, idSabores) VALUES('${idPizza}', '${sabores[i]}');`;
    var pizza = await mysql.query(sql);
  }

  sql = `INSERT INTO pedidos (idPizza, idStatus, idCliente) VALUES('${idPizza}', 1, '${id}');`;
  var pizza = await mysql.query(sql);
}

async function listaPizza() {
  sql = `SELECT * FROM pizza;`;
  var pizza = await mysql.query(sql);

  const pedido = pizza.map(async (pizza) => {
    sql = `SELECT tipo FROM massas WHERE idMassas='${pizza.idMassas}';`;
    var massas = await mysql.query(sql);
    sql = `SELECT tipo FROM bordas WHERE idBordas='${pizza.idBordas}';`;
    var bordas = await mysql.query(sql);
    sql = `SELECT * FROM pizza_sabor WHERE idPizza='${pizza.idPizza}';`;
    var pizzaSabor = await mysql.query(sql);
    sql = `SELECT idStatus, idCliente FROM pedidos WHERE idPizza='${pizza.idPizza}'`;
    var ids = await mysql.query(sql);
    sql = `SELECT tipo FROM status WHERE idStatus='${ids[0].idStatus}'`;
    var status = await mysql.query(sql);
    sql = `SELECT nome FROM cliente WHERE idCliente='${ids[0].idCliente}'`;
    var nome = await mysql.query(sql);

    var sabores = [];

    for (var i = 0; i < pizzaSabor.length; i++) {
      sql = `SELECT nome FROM sabores WHERE idSabores='${pizzaSabor[i].idSabores}';`;
      sabores[i] = await mysql.query(sql);
    }

    data = {
      id: pizza.idPizza,
      nomeCliente: nome[0].nome,
      status: status[0].tipo,
      bordas: bordas[0].tipo,
      massas: massas[0].tipo,
      sabores: sabores,
    };

    return data;
  });

  const pedidos = await Promise.all(pedido);
  return pedidos;
}

async function graficoPizzaVendida() {
  sql = `SELECT s.nome, COUNT(ps.idSabores) AS vendidos FROM pizza_sabor ps, sabores s WHERE s.idSabores = ps.idSabores GROUP BY nome;`;
  return await mysql.query(sql);
}

async function apagarPedido(id) {
  sql = `DELETE FROM pedidos WHERE idPizza=${id};`;
  await mysql.query(sql);
  sql = `DELETE FROM pizza_sabor WHERE idPizza=${id};`;
  await mysql.query(sql);
  sql = `DELETE FROM pizza WHERE idPizza=${id};`;
  await mysql.query(sql);
}

async function alterarStatusPedido(data) {
  sql = `UPDATE pedidos SET idStatus = ${data.status} WHERE idPizza = ${data.id};`;
  await mysql.query(sql);
}

module.exports = { pizzaDados, inserePedido, listaPizza, graficoPizzaVendida, apagarPedido, alterarStatusPedido };
