const { Scenes } = require("telegraf");

const addNewOrderScene = new Scenes.BaseScene('newOrder')

addNewOrderScene.enter(ctx => ctx.reply('Введите коментарий'))