const usuarioModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (data) => {
    return usuarioModel.login(data);
};

exports.registro = async (data) => {
    const saltsenha = await bcrypt.genSalt(12)
    const hashsenha = await bcrypt.hash(data[2], saltsenha)
    data[2] = hashsenha;
    return usuarioModel.registro(data);
};

exports.loginVerifica = (req, res, next) => {
    if (!req.session.login) {
        res.redirect('/select');
    } else {
        next();
    }
};

exports.logOut = (req, res, next) => {
    if (req.session.login === undefined) {
        next();
    } else {
        req.session.login = undefined;
        res.redirect('/login');
    }
};