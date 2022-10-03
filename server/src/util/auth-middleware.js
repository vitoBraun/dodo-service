const notAuthenticatedMessage = "Вы не авторизованы";
const notAdminMessage = "Нет доступа";

module.exports.authorize = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send(notAuthenticatedMessage);
  }
};

module.exports.authorizeAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.type === "admin") {
    next();
  } else if (!req.user) {
    res.status(401).send(notAuthenticatedMessage);
  } else {
    res.status(403).send(notAdminMessage);
  }
};
