const mysql = require('./mysql')
const bcrypt = require("bcrypt");

async function login(data) {
    sql = `SELECT * FROM cliente WHERE email = '${data[0]}'`;
    var usuarios = await mysql.query(sql);
    if (usuarios[0] != null) {
        if (await bcrypt.compare(data[1], usuarios[0].senha)) {
            const id = usuarios[0].idCliente;
            const nome = usuarios[0].nome;
            return { id, nome };
        } else {
            return false;
        }
    } else {
        return false;
    }
};

async function registro(data) {
    sql = `INSERT INTO Cliente (nome, email, senha) VALUES ('${data[0]}', '${data[1]}', '${data[2]}')`;
    await mysql.query(sql);
    sql = `SELECT * FROM Cliente WHERE email = '${data[1]}'`;
    var usuarios = await mysql.query(sql);
    var nome = usuarios[0].nome;
    var id = usuarios[0].idCliente;
    return { id, nome };
};

module.exports = { login, registro };