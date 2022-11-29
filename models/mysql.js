async function connect(){
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://root:GhY67GJ8@localhost/pizza?reconnect=true");
    global.connection = connection;
    return connection;
}

async function query(sql) {
    const conn = await connect();
    const [rows] = await conn.query(sql);
    return rows;
}

module.exports = { query };