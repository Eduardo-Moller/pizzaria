const pizzaModel = require("../models/pizzaModel");

exports.pizzaDados = async () => {
  return pizzaModel.pizzaDados();
};

exports.inserePedido = async (data, id) => {
  return pizzaModel.inserePedido(data, id);
};

exports.listaPizza = async () => {
    return pizzaModel.listaPizza();
};

exports.graficoPizzaVendida = async () => {
    return pizzaModel.graficoPizzaVendida();
};

exports.apagarPedido = async (id) => {
  return pizzaModel.apagarPedido(id);
};

exports.alterarStatusPedido = async (data) => {
  return pizzaModel.alterarStatusPedido(data);
};





