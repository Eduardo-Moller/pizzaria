const mysql = require("./mysql");
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
}

async function registro(data) {
  sql = `INSERT INTO cliente (nome, email, senha, admim) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', 0)`;
  await mysql.query(sql);
  sql = `SELECT * FROM cliente WHERE email = '${data[1]}'`;
  var usuarios = await mysql.query(sql);
  var nome = usuarios[0].nome;
  var id = usuarios[0].idCliente;
  return { id, nome };
}

async function insereEndereco(data, id) {
  sql = `INSERT INTO enderecos (cidade, bairro, rua, numero, complemento, idCliente) VALUES ('${data.cidade}', '${data.bairro}', '${data.rua}', '${data.numero}', '${data.complemento}', '${id}')`;
  await mysql.query(sql);
}

async function vericaEndereco(id) {
  sql = `SELECT * FROM enderecos WHERE idCliente='${id}'`;
  var verifica = await mysql.query(sql);
  if (verifica[0] != null) {
    return true;
  }
  return false;
}

async function alterarEndereco(data, id) {
  sql = `UPDATE  enderecos SET cidade = '${data.cidade}', bairro = '${data.bairro}', rua = '${data.rua}' , numero = '${data.numero}', complemento = '${data.complemento}'  WHERE idCliente='${id}';`;
  await mysql.query(sql);
}

async function vericaAdm(id) {
    sql = `SELECT admim FROM cliente WHERE idCliente = '${id}'`;
    return await mysql.query(sql);
}

module.exports = {
  login,
  registro,
  insereEndereco,
  vericaEndereco,
  alterarEndereco,
  vericaAdm,
};
