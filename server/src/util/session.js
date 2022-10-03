const session = require("express-session");
const FileStore = require("session-file-store")(session);

const sess = {
  secret: process.env.SESSION_SECRET,
  store: new FileStore(),
  cookie: {
    path: "/",
    httpOnly: true,
    maxAge: +process.env.SESSION_MAX_AGE,
    secure:
      process.env.NODE_ENV === "production" && !process.env.INSECURE_COOKIES,
  },
  resave: false,
  saveUninitialized: false,
};

module.exports = session(sess);
