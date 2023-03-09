const initializeDbAndServer = require("./getDatabase");

const express = require("express");
const app = express();
app.use(express.json());

let database = initializeDbAndServer();

app.post("/inventory/", async (request, response) => {
  const { payload } = request.body;
  for (let eachProduct of payload) {
    let { productId, quantity, operation } = eachProduct;
    let getPreviousDataQuery = `
        SELECT
            *
        FROM 
            inventory
        WHERE
            productId = ${productId};`;
    let previousData = await database.get(getPreviousDataQuery);

    let updatedQuantity = null;
    if (operation === "add") {
      updatedQuantity = quantity + previousData.quantity;
    } else if (operation === "subtract") {
      updatedQuantity = quantity - previousData.quantity;
    }

    let updateProductQuantityQuery = `
        UPDATE
            inventory
        SET
            quantity = ${updatedQuantity}
        WHERE
            productId = ${productId};`;

    await database.run(updateProductQuantityQuery);
  }
  response.send("The Products Have Been Updated Successfully");
});
