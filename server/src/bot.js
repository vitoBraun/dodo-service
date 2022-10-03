const { Telegraf, Scenes } = require("telegraf");
const bot = new Telegraf(process.env.TG_TOKEN);
const { session } = require("telegraf-session-mongoose");
const { start, backMenu } = require("./controllers/command");
const { MENU_TEXT } = require("./config/consts");

const stage = new Scenes.Stage([]);

const initBot = () => {
  bot.use(session({ collectionName: "sessions" }));
  bot.use(stage.middleware());
  bot.use((ctx, next) => {
    console.log(ctx);
    return next();
  });

  bot.start(start);
  bot.hears(MENU_TEXT.menu, backMenu);
  bot.hears(MENU_TEXT.getInfo);
  return bot;
};

module.exports = { initBot };
