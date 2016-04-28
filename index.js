var TelegramBot = require('node-telegram-bot-api');

var token = '142794582:AAGDZgWbp3yc6vxYm3ZyX8TfuMdw7Ym-TIk';
// Setup polling way
var bot = new TelegramBot(token, {
	polling: true
});

console.log("Bot is running!");

var dictionary = require("./letter_map.js");
var translator = require("./translator.js");
// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function(msg, match) {
	var fromId = msg.from.id;
	var resp = match[1];
	bot.sendMessage(fromId, resp);
});

bot.onText(/\/help/, function(msg) {
	var helperMessage = "Буквы меняются следующим образом: \nа -> ә, о -> ө, к -> ҡ,\nг -> ғ, с -> ҫ, з -> ҙ, \nх -> һ, у -> ү, н -> ң"
						+ "\nЧтобы заменить букву надо перед ним поставить % или $. В середине слова можно написать букву с заглавной буквы"
						+ "\nПример: %ХаумыХыГыЗ -> Һаумыһығыҙ";
	bot.sendMessage(msg.from.id, helperMessage);
});

bot.on('inline_query', function(msg) {
	console.log("inline!!");
	var translatedMessage = translator.translate(msg.query);
	bot.answerInlineQuery(msg.id, [makeMessage(translatedMessage)]);
});

// Any kind of message
bot.on('message', function(msg) {
	if (msg.text == "\/help")
		return;
	var chatId = msg.chat.id;
	var translatedMessage = translator.translate(msg.text);
	bot.sendMessage(msg.from.id, translatedMessage);
});

function makeMessage(translatedMessage) {
	var message = {
		"type": "article",
		"title": "Башкортса:",
		"id": getRand(),
		"input_message_content": {
			"message_text": translatedMessage
		},
		"description": translatedMessage
	};
	return message;

}

function getRand() {
	return Math.floor((Math.random() * 100) + 1).toString();
}

function getKeyboard() {
	var keyboard = {
		"inline_keyboard": [
			[getButton("A", "Letter a")]
		]
	};
	return keyboard;
}

function getButton(title, callback_data) {
	return {
		"text": title,
		"callback_data": callback_data
	};
}