var dictionary = require('./letter_map.js');

exports.translate = function(msg) {
	if (empty(msg))
		msg = "САлАм!";
	var words = msg.split(" ");
	for (var i = 0; i < words.length; i++) {
		words[i] = transformByCaps(transformByUpperOperator(words[i]));
	}
	return words.join(" ");
}

function transformByUpperOperator(word) {
	var newWord = "";
	var changeLetter = false;
	for (var i = 0; i < word.length; i++) {
		var letter = word[i];
		if (!isUpperOperator(letter)) {

			if (changeLetter) {
				var newLetter = getSuitableLetter(letter);
				if (isUpperCase(letter))
					newLetter = newLetter.toUpperCase();
				newWord += newLetter;
			} else
				newWord += letter;
			changeLetter = false;
		} else
			changeLetter = true;

	}
	return newWord;
}

function transformByCaps(word) {
	var newWord = word;
	var startPoint = 1;
	
	for (var i = startPoint; i < newWord.length; i++) {
		if (isUpperCase(newWord[i]))
			newWord = newWord.replaceAt(i, getSuitableLetter(newWord[i]));
	}
	return newWord;
}

function isUpperCase(letter) {
	return letter == letter.toUpperCase() && letter != letter.toLowerCase();
}

function getSuitableLetter(letter) {
	var result = dictionary.map[letter.toLowerCase()];

	if (result === null || result === undefined)
		result = letter;
	return result;
}

String.prototype.replaceAt = function(index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}

function empty(str) {
	return str == null || str === undefined || str.length == 0;
}

function isUpperOperator(letter) {
	return "$%".indexOf(letter) > -1;
}