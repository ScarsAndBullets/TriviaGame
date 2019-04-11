//Countries for questions and answers
var countries = [
	(afghanistan = {
		name: "Afghanistan",
		capital: "Kabul",
		cities: ["Bagram", "Jalalabad", "Kandahar"]
	}),
	(colombia = {
		name: "Colombia",
		capital: "Bogotá",
		cities: ["Cucutá", "Bucuramanga", "Villavicencio"]
	}),
	(algeria = {
		name: "Algeria",
		capital: "Algiers",
		cities: ["Constantine", "Oran", "Sétif"]
	}),
	(egypt = {
		name: "Egypt",
		capital: "Cairo",
		cities: ["Thebes", "Luxor", "Alexandria"]
	}),
	(france = {
		name: "France",
		capital: "Paris",
		cities: ["Nice", "Marseille", "Lyon"]
	}),
	(spain = {
		name: "Spain",
		capital: "Madrid",
		cities: ["Barcelona", "Valencia", "Seville"]
	}),
	(norway = {
		name: "Norway",
		capital: "Oslo",
		cities: ["Trondheim", "Bergen", "Drammen"]
	}),
	(brazil = {
		name: "Brazil",
		capital: "Brasília",
		cities: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"]
	}),
	(england = {
		name: "England",
		capital: "London",
		cities: ["Manchester", "Liverpool", "York"]
	})
];

//timer variables
var questionTime = 15;
var questionTimer;

//holds country string value for each question
var countryNum;

//array log countries as they are picked, prevents repeat questions
var pickedCountries = [];

//Score
var correct = 0;
var incorrect = 0;

//Doc ready
$(document).ready(startUp);

//dynamically loads start screen and prompts user to start the game
function startUp() {
	correct = 0;
	incorrect = 0;
	var mainContent = `<h1>To begin playing, click the start button. You will have ${questionTime} seconds to answer each question.</h1><button type="button" class="btn btn-primary btn-lg">Start</button>`;
	$("#main").html(mainContent);
	$(".btn").click(question);
}

function question() {
	//Determin which country will be used for the question and stores it
	countryNum = pickCountry();
	pickedCountries.push(countries[countryNum].name);

	//Display Score
	$("#score").html(`<h1 class="display-4">Your answers:</h1>
		<hr>Correct - ${correct}<br>Incorrect - ${incorrect}`);

	//Builds question screen layout
	var layout = `<div class="row"><div class="col-lg-8" id="left"></div><div class="col-lg-4" id="right"></div></div><div class="row" id="answers"></div>`;
	$("#main").empty();
	$("#main").append(layout);

	//Displays questions
	$("#left").append(
		`<h1>What is the capital of ${countries[countryNum].name}?`
	);

	//Start 15 second question timer
	questionTime = 15;
	questionTimer = setInterval(timer, 1000);

	//Displays time remaining to answer question
	$("#right").append(`<h1 id="timer">Time left: ${questionTime}`);

	//dynamically loads answers on screen
	loadAnswers();
}

function timer() {
	if (questionTime <= 0) {
		clearInterval(questionTimer);
		timeRanOut();
	} else {
		$("#timer").text(`Time left: ${questionTime}`);
	}
}

function timeRanOut() {
	$("#timer").text(`Time's up!`);
	$("#answers").empty();
	$("#left").html(
		`<h1>You ran out of time. The capital of ${
			countries[countryNum].name
		} is ${countries[countryNum].capital}.`
	);
	incorrect++;
	setTimeout(question, 5000);
}

//picks unique country from array
function pickCountry() {
	if (pickedCountries.length < countries.length) {
		var unique = false;
		while (!unique) {
			unique = true;
			//randomly chooses country, verifies that it hasn't been called before
			var rando = Math.floor(Math.random() * countries.length);
			if (!pickedCountries.includes(countries[rando].name)) {
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

function loadAnswers() {
	var answers = [];
	answers.push(countries[countryNum].capital);
	for (var i = 0; i < countries[countryNum].cities.length; i++) {
		answers.push(countries[countryNum].cities[i]);
	}
	answers = shuffle(answers);
	var answersHTML = "";
	for (var j = 0; j < answers.length; j++) {
		answersHTML += `<button type="button" class="btn btn-light" id="answer${j}">${
			answers[j]
		}</button>`;
	}
	console.log(`answersHTML:  ${answersHTML}`);
	$("#answers").html(answersHTML);
	$("#answer0").click(validateAnswer(answers[0]));
	$("#answer1").click(validateAnswer(answers[1]));
	$("#answer2").click(validateAnswer(answers[2]));
	$("#answer3").click(validateAnswer(answers[3]));
}

function validateAnswer(input) {
	clearInterval(questionTimer);
	$("#answers").empty();
	if (countries[countryNum].capital === input) {
		correct++;
		$("#left").html(
			`<h1>That is correct! ${
				countries[countryNum].capital
			} is the captial of ${countries[countryNum].name}.`
		);
	} else {
		incorrect++;
		$("#left").html(
			`<h1>${input} is incorrect, ${
				countries[countryNum].capital
			} is the captial of ${countries[countryNum].name}.`
		);
	}
	setTimeout(question, 5000);
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
