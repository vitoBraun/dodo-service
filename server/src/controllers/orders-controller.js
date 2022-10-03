const {
  createOrder,
  findOrders,
  updateOrderById,
} = require("../services/orders-service");

const addOrder = async (req, res) => {
  const { branch, manager, faultIndex, description, files } = req.body;
  const email = req.user.email;
  try {
    const order = await createOrder({
      branch,
      manager,
      faultIndex,
      description,
      files,
      email,
    });
    res.json({ id: order._id });
  } catch (error) {
    res.status(500).send("Ошибка при сохранении заказа");
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await findOrders();
    res.json({ orders });
  } catch (error) {
    res.status(500).send("Ошибка при получении заказов");
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await updateOrderById({ id, ...req.body });
    res.json({ order });
  } catch (error) {}
};

module.exports = { addOrder, getOrders, updateOrder };
