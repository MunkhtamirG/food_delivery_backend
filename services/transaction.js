const config = require("../config");
const mysql = require("mysql2/promise");

async function createOrder() {
  const connection = await mysql.createConnection(config.db);
  await connection.execute("set autocommit = 0");
  console.log("setting off the autocommit");

  connection.execute("set session transaction isolation level read committed");
  console.log("setting the transactiun isollation level");

  await connection.beginTransaction();
  console.log("starting transaction");

  try {
    connection.execute(
      "insert into orders (customer_id, deliveryman_id, ordered_date, order_status, total_fee) values (?, ?, ?, ?, ?)",
      [1, 2, "2022-08-15 12:26:26", 1, 6000]
    );
    console.log("inserted data to orders");

    const [rows] = await connection.execute(
      "select last_insert_id() as order_id"
    );
    console.log(" getting last id of the new inserted order");

    connection.execute(
      "insert into order_detail (food_id, food_price, order_id) values ( ?, ?,?)",
      [1, 180, rows[0].order_id]
    );
    console.log("insert data into order detail");

    connection.commit();
    console.log("commit successfully");
  } catch (error) {
    console.error("Error occured whil creating order: " + error.message);
    connection.rollback();
    console.error("Transaction is successfully rolled back");
  }
}

(async function testOrder() {
  console.log(await createOrder());
})();

// module.exports = { createOrder };
