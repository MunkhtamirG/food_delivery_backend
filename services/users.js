const db = require("./db");

async function getAllUsers() {
  const data = await db.query("SELECT * FROM users");
  const params = {};

  return {
    data,
    params,
  };
}

async function getOneUser(id) {
  const data = await db.query("SELECT * FROM users where id=?", [id]);
  const params = {};

  return {
    data,
    params,
  };
}

async function createUser(params) {
  const firstName = params.firstName;
  const lastName = params.lastName;
  const email = params.email;
  const address = params.address;
  const phone = params.phone;
  const role_id = params.role_id;
  const data = await db.query(
    " INSERT INTO users (firstName, lastName, email, address, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, address, phone, role_id]
  );
  return {
    data: data,
  };
}

async function deleteUser(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM users where id=?", [id]);
  return {
    data: data,
  };
}

async function updateUser(params) {
  const firstName = params.firstName;
  const lastName = params.lastName;
  const email = params.email;
  const address = params.address;
  const phone = params.phone;
  const role_id = params.role_id;
  const id = params.id;
  const data = await db.query(
    "update users set firstName=?, lastName=?, email=?, address=?, phone=?, role_id=? where id=? ",
    [firstName, lastName, email, address, phone, role_id, id]
  );
  return {
    data: data,
  };
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getOneUser,
};
