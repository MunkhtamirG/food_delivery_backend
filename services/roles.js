const db = require("./db");

async function getAllRoles() {
  const data = await db.query("SELECT * FROM roles");
  const params = {};

  return {
    data,
    params,
  };
}

async function getOneRole(id) {
  const data = await db.query("SELECT * FROM roles where id=?", [id]);
  const params = {};

  return {
    data,
    params,
  };
}

async function createRole(params) {
  const id = params.id;
  const role_name = params.role_name;
  const role_description = params.role_description;
  const data = await db.query(
    " INSERT INTO roles (id, role_name, role_description) VALUES (?, ?,?)",
    [id, role_name, role_description]
  );
  return {
    data: data,
  };
}

async function deleteRole(params) {
  const id = params.id;
  const data = await db.query("DELETE FROM roles where id=?", [id]);
  return {
    data: data,
  };
}

async function updateRole(params) {
  const role_name = params.role_name;
  const role_description = params.role_description;
  const id = params.id;
  const data = await db.query(
    "update roles set role_name=?, role_description=? where id=? ",
    [role_name, role_description, id]
  );
  return {
    data: data,
  };
}

module.exports = {
  getAllRoles,
  createRole,
  deleteRole,
  updateRole,
  getOneRole,
};
