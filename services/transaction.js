const db = require("./db");

async function createOrder() {
  db.query("set autocommit = 0");
  console.log("setting off the autocommit");

  db.query("set session transaction isolation level read committed");
  console.log("setting the transactiun isollation level");

  db.beginTransaction();
  console.log("starting transaction");

  try {
    db.query(
      "insert into orders (customer_id, deliveryman_id, ordered_date, order_status, total_fee) values (?, ?, ?, ?, ?)",
      [1, 5, "2022-08-15 12:26:26", 1, 6000]
    );
    console.log("inserted data to orders");

    db.query("set @id = last_insert_id()");
    console.log(" getting last id of the new inserted order");

    db.query(
      "insert into order_detail (food_id, food_price, order_id) values ( ?, ?,?)",
      [1, 180, "@id"]
    );
    console.log("insert data into order detail");

    db.commit();
    console.log("commit successfully");
  } catch (error) {
    console.error("Error occured whil creating order: " + error.message);
    db.rollBack();
    console.error("Transaction is successfully rolled back");
  }
}

module.exports = { createOrder };
