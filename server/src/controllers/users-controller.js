const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createDemoClient,
} = require("../services/users-service");
const { userTypes, userGroups } = require("../util/constants");
// const { sendLoginConfirmation } = require("../services/mail-service");

module.exports.getUsers = (req, res, next) => {
  getUsers()
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const id = req.params.id;
  if (id) {
    getUserById(id)
      .then((user) => res.json(user))
      .catch((err) => {
        if (err.name === "CastError") {
          res.status(400).send("Некорректный id");
        } else {
          next(err);
        }
      });
  } else {
    res.status(400).send("Некорректный id");
  }
};

module.exports.createUser = (req, res, next) => {
  const { email, password, type, group, catalogUrl } = req.body;
  if (
    !email ||
    !password ||
    !type ||
    !userTypes.includes(type) ||
    !userGroups.includes(group)
  ) {
    res.status(400).send("Некорректные данные");
  } else {
    const groups = group === "all" ? [] : [group];
    createUser({ email, password, type, groups, catalogUrl })
      .then((user) => res.json(user))
      .catch(next);
  }
};

module.exports.registerDemoClient = async (req, res, next) => {
  const { username: email, password } = req.body;
  if (req.headers.origin !== process.env.HOST) {
    res.status(403).end();
  } else if (!email || !password) {
    res.status(400).send("Некорректные данные");
  } else {
    try {
      await createDemoClient({ email, password });
      // await sendLoginConfirmation(email, password);
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
};

module.exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const { type, group, catalogUrl } = req.body;
  if (
    (type && !userTypes.includes(type)) ||
    (group && !userGroups.includes(group))
  ) {
    res.status(400).send("Некорректные данные");
  }
  const groups = group === "all" ? [] : [group];
  if (id) {
    updateUser(id, { type, groups, catalogUrl })
      .then((user) => res.json(user))
      .catch((err) => {
        if (err.name === "CastError") {
          res.status(400).send("Некорректный id");
        } else {
          next(err);
        }
      });
  } else {
    res.status(400).send("Некорректный id");
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);
    if (req.user.id === id) {
      req.logout();
    }
    res.json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
