const usuarioModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (data) => {
  return usuarioModel.login(data);
};

exports.registro = async (data) => {
  const saltsenha = await bcrypt.genSalt(12);
  const hashsenha = await bcrypt.hash(data[2], saltsenha);
  data[2] = hashsenha;
  return usuarioModel.registro(data);
};

exports.loginVerifica = (req, res, next) => {
  if (!req.session.login) {
    res.redirect("/select");
  } else {
    next();
  }
};

exports.insereEndereco = async (data, id) => {
  await usuarioModel.insereEndereco(data, id);
};

exports.alterarEndereco = async (data, id) => {
  return await usuarioModel.alterarEndereco(data, id);
};

exports.vericaEndereco = async (id) => {
  return await usuarioModel.vericaEndereco(id);
};

exports.vericaAdm = async (id) => {
    return await usuarioModel.vericaAdm(id);
  };

