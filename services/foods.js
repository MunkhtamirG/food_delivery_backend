const db = require("./db");

async function getAllFoods() {
  const data = await db.query("SELECT * FROM foods");
  const params = {};

  return {
    data,
    params,
  };
}

async function getOneFood(id) {
  const data = await db.query("SELECT * FROM foods where food_id=?", [id]);
  const params = {};

  return {
    data,
    params,
  };
}

async function createFoods(params) {
  const discount = params.discount;
  const sales = params.sales;
  const name = params.name;
  const price = params.price;
  const portion = params.portion;
  const stock = params.stock;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const ingredients = params.ingredients;
  const category_id = params.category_id;
  const data = await db.query(
    " INSERT INTO foods (discount, sales, name, price, portion, stock, image, tumb_img, ingredients, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      discount,
      sales,
      name,
      price,
      portion,
      stock,
      image,
      tumb_img,
      ingredients,
      category_id,
    ]
  );
  return {
    data: data,
  };
}

async function deleteFoods(params) {
  const id = params.food_id;
  const data = await db.query("DELETE FROM foods where food_id=?", [id]);
  return {
    data: data,
  };
}

async function updateFoods(params) {
  const discount = params.discount;
  const sales = params.sales;
  const id = params.food_id;
  const name = params.name;
  const price = params.price;
  const portion = params.portion;
  const stock = params.stock;
  const image = params.image;
  const tumb_img = params.tumb_img;
  const ingredients = params.ingredients;
  const category_id = params.category_id;
  const data = await db.query(
    "update foods set discount=?, sales=?, name=?, price=?, portion=?, stock=?, image=?, tumb_img=?, ingredients=?, category_id=? where food_id=?  ",
    [
      discount,
      sales,
      name,
      price,
      portion,
      stock,
      image,
      tumb_img,
      ingredients,
      category_id,
      id,
    ]
  );
  return {
    data: data,
  };
}

module.exports = {
  getAllFoods,
  createFoods,
  deleteFoods,
  updateFoods,
  getOneFood,
};
