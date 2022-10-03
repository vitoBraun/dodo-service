const express = require("express");
const ordersRouter = express.Router();
const { addOrder, getOrders, updateOrder } = require("./orders-controller");

const basicUrl = "/api/orders";
// const { authorize } = require("../util/auth-middleware");

ordersRouter.post(basicUrl, addOrder);

ordersRouter.get(basicUrl, getOrders);

ordersRouter.put(`${basicUrl}/:id`, updateOrder);

module.exports = ordersRouter;
