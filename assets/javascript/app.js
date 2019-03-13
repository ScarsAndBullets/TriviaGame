//object with countries, their capitals, and other cities in the country
var countries = [{
	Afghanistan = {
		name: "Afghanistan",
		capital: "Kabul",
		cities: ["Bagram", "Jalalabad", "Kandahar"]
	},
	Colombia = {
		name: "Colombia",
		capital: "Bogotá",
		cities: ["Cucutá", "Bucuramanga", "Villavicencio"]
	},
	Algeria = {
		name: "Algeria",
		capital: "Algiers",
		cities: ["Constantine", "Oran", "Sétif"]
	},
	Egypt = {
		name: "Egypt",
		capital: "Cairo",
		cities: ["Thebes", "Luxor", "Alexandria"]
	},
	England = {
		name: "England",
		capital: "London",
		cities: ["Manchester", "Liverpool", "York"]
	}
}];

//log countries as they are picked, prevents repeat questions
var pickedCountries = [];
var capitals = [];
var cities = [];
function buildarrays() {
	for (var i = 0; i < countries.length; i++) {
		capitals.push(countries[i].capital);
		for (var j = 0; j < countries[i].cities.length; j++) {
			cities.push(countries[i].cities[j]);
		}
	}
}

buildarrays();

console.log(`Capitals array: ${capitals}`);
console.log(`Cities array: ${cities}`);

//timer variables
var timeLimit;
var intervalID;

//holds country string value for each question
var countryNum;

//dynamically loads start screen and prompts user to start the game
function startUp() {
	setTimeLimit();
	var mainContent = `<h1>To begin playing, click the start button. You will have ${timeLimit} seconds to answer each question.</h1><button type="button" class="btn btn-primary btn-lg">Start</button>`;
	$("#main").empty();
	$("#main").append(mainContent);
	$(".btn").click(question);
}

//dynamically loads the trivia question, timer, and row for answers.
function question() {
	countryNum = pickCountry();
	pickedCountries.push(countries[countryNum]);
	console.log(
		`Country for this iteration: ${
			countries[countryNum].name
		} pickedCountries array: ${pickedCountries}`
	);
	var layout = `<div class="row"><div class="col-lg-8" id="left"></div><div class="col-lg-4" id="right"></div></div><div class="row" id="answers"></div>`;
	setTimeLimit();
	intervalID = setInterval(timer, 1000);
	$("#main").empty();
	$("#main").append(layout);
	$("#left").append(`<h1>What is the capital of ${countries[countryNum]}?`);
	$("#right").append(`<h1 id="timer">Time left: ${timeLimit}`);
	loadAnswers();
}

//Randomly selects country for trivia question
function pickCountry() {
	if (pickedCountries.length != countries.length) {
		var unique = false;
		while (!unique) {
			unique = true;
			var rando = Math.floor(Math.random() * countries.length);
			console.log(`countries[rando]: ${countries[rando]}`);
			if (!pickedCountries.includes(countries[rando])) {
				unique = true;
				return rando;
			} else {
				unique = false;
			}
		}
	} else {
		gameOver();
	}
}

function setTimeLimit() {
	timeLimit = 15;
}

function timer() {
	timeLimit--;
	if (timeLimit <= 0) {
		clearInterval(intervalID);
		$("#timer").text(`Time's up!`);
		timedOut();
		setTimeout(question(), 5000);
	} else {
		$("#timer").text(`Time left: ${timeLimit}`);
	}
}

function timedOut() {
	//show correct answer
	$("#left").html(`<h1>The capital of ${countries[countryNum]} is:`);
	//$("#answers").html(`<button type="button" class="btn btn-secondary btn-lg btn-block">${}</button>`);
}

function loadAnswers() {
	var answers = [];
	answers.push(countries[countryNum].capital);
	for (var i = 0; i < countries[countryNum].cities.length; i++) {
		answers.push(countries[countryNum].cities[i]);
	}
	answers = shuffle(answers);
	var answersHTML = "";
	for (var j = 0; j < answers.length; j++) {
		answersHTML += `<button type="button" class="btn btn-light">${
			answers[j]
		}</button>`;
	}
	console.log(`answersHTML:  ${answersHTML}`);
	$("#answers").html(answersHTML);
}

//Fisher-Yates Shuffle from: https://javascript.info/task/shuffle, applied to shuffle my answers
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function gameOver() {
	//show score, button to restart (run function startup())
	//Set timeout then run function startup()
}

$(document).ready(startUp);
