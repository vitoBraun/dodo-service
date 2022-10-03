const { mainMenu } = require("../util/buttons");

const start = (ctx) => ctx.reply("Привет, выбери ", { ...mainMenu });

const backMenu = (ctx) => ctx.reply("ты находишься в меню", { ...mainMenu });

const addNewOrder = ctx =>{
    
}

module.exports = { start, backMenu };
