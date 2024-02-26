const express = require("express");
const axios = require("axios");
const { Telegraf } = require("telegraf");

require("dotenv/config");
const app = express();

app.use(express.static("static"));
app.use(express.json());

const port = process.env.PORT;
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Hello ${ctx.from.first_name}! Welcome to the world of news. I can reply to
    /bitcoin
    `
  );
});

bot.command("dance", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "🕺");
});

bot.command("bitcoin", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Fetching the bitcoin rate...");
  axios.get(process.env.CRYPTO_API).then((res) => {
    const message = `The current bitcoin rate in USD is: ${res.data.USD}`;
    bot.telegram.sendMessage(ctx.chat.id, message);
  });
});

bot.telegram.setWebhook(process.env.APP_URL);

app.use(bot.webhookCallback("/updates4u"));
app.listen(port, () => console.log("Server started on port ", port));
