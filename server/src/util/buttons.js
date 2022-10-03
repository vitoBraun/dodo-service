const { Markup } = require("telegraf");
const { MENU_TEXT } = require("../config/consts");
const mainMenu = Markup.keyboard([
  MENU_TEXT.newOrder,
  MENU_TEXT.getInfo,
  MENU_TEXT.menu,
]).resize();

const backButtonMenu = Markup.keyboard([MENU_TEXT.menu]);
module.exports = { mainMenu, backButtonMenu };
