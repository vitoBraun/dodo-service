const Order = require("../models/orders-model");

async function createOrder({
  branch,
  manager,
  faultIndex,
  description,
  files,
  email,
}) {
  const saveOrder = () => {
    const order = new Order({
      branch,
      manager,
      faultIndex,
      description,
      files,
      email,
    });
    return order.save();
  };
  return saveOrder();
}

async function findOrders() {
  const result = await Order.find();
  return result;
}

async function updateOrderById(data) {
  const set = {};
  switch (data.status) {
    case "work":
      set.status = data.status;
      set.operatorsComment = data.operatorsComment;
      set.takenToWork = new Date();
      set.executor = data.executor;
      break;
    case "done":
      set.status = data.status;
      set.engineersComment = data.engineersComment;
      set.doneFiles = data.doneFiles;
      set.completed = new Date();
      break;
    case "closed":
      set.status = data.status;
      set.completed = new Date();
      break;
    default:
      break;
  }
  const order = await Order.findByIdAndUpdate(
    data.id,
    {
      $set: set,
    },
    { new: true, lean: true }
  );
  return order;
}

module.exports = { createOrder, findOrders, updateOrderById };
