/*async function connect() {
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(
    "mysql://root:GhY67GJ8@localhost/pizza2"
  );
  global.connection = connection;
  return connection;
}

async function query(sql) {
  const conn = await connect();
  const [rows] = await conn.query(sql);
  return rows;
}*/

var pool = undefined;

async function connect() {
    const mysql = require('mysql2/promise');
    if(pool){
        return pool;
    }
    pool = await mysql.createPool({
        host: 'containers-us-west-145.railway.app',
        port: 8034,
        user: 'root',
        password: 'rDipvdKQtaPKy0AIhvua',
        database: 'railway',
        connectionLimit: 8,
        waitForConnections: true
    });
    return pool;
}

async function query(sql) {
    const conn = await connect();
    const [rows] = await conn.query(sql);
    return rows;
}

module.exports = { query };
