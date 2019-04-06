//Trive questions/answers as country data object nested in an array.
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
// //test trivia question data
// console.log("Country: " + countries[0].name);
// console.log("Capital: " + countries[0].capital);
// console.log("City 1: " + countries[0].cities[0]);
// console.log("City 2: " + countries[0].cities[1]);
// console.log("City 3: " + countries[0].cities[2]);

//timer variables
var timeLimit;
var intervalID;

//holds country string value for each question
var countryNum;

//array log countries as they are picked, prevents repeat questions
var pickedCountries = [];

// array for cities and captils, allows for authentication of correct/incorrect answers
var capitals = [];
var cities = [];

// // answers array, generated for each question
// var answers = [];

//Score
var correct = 0;
var incorrect = 0;

//Doc ready
$(document).ready(runGame);

function runGame() {
	buildarrays();
	startUp();
}

//builds capitals/cities arrays
function buildarrays() {
	for (var i = 0; i < countries.length; i++) {
		capitals.push(countries[i].capital);
		for (var j = 0; j < countries[i].cities.length; j++) {
			cities.push(countries[i].cities[j]);
		}
	}
}
// console.log(`Capitals array: ${capitals}`);
// console.log(`Cities array: ${cities}`);

//dynamically loads start screen and prompts user to start the game
function startUp() {
	setTimeLimit();
	correct = 0;
	incorrect = 0;
	var mainContent = `<h1>To begin playing, click the start button. You will have ${timeLimit} seconds to answer each question.</h1><button type="button" class="btn btn-primary btn-lg">Start</button>`;
	$("#main").empty();
	$("#main").append(mainContent);
	$(".btn").click(question); //run function question()
}

//dynamically loads the trivia question, timer, and row for answers.
function question() {
	countryNum = pickCountry(); //countryNum assigned unique "rando" number from pickCountry
	pickedCountries.push(countries[countryNum].name);
	$("#score").html(`<h1 class="display-4">Your answers:</h1>
		<hr>Correct - ${correct}<br>Incorrect - ${incorrect}`);
	var layout = `<div class="row"><div class="col-lg-8" id="left"></div><div class="col-lg-4" id="right"></div></div><div class="row" id="answers"></div>`;
	setTimeLimit();
	intervalID = setInterval(timer, 1000);
	$("#main").empty();
	$("#main").append(layout);
	$("#left").append(
		`<h1>What is the capital of ${countries[countryNum].name}?`
	);
	$("#right").append(`<h1 id="timer">Time left: ${timeLimit}`);
	loadAnswers();
}

//Determines if game is over or not
//Pick a random country from the countries array that hasn't been called before
//Returns "rando", which is the index for the unique country
function pickCountry() {
	//keeps picking new country/question until all have been picked
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

function setTimeLimit() {
	timeLimit = 15;
}

function timer() {
	timeLimit--;
	if (timeLimit <= 0) {
		incorrect++;
		clearInterval(intervalID);
		$("#timer").text(`Time's up!`);
		$("#answers").empty();
		$("#left").html(
			`<h1>You ran out of time. The capital of ${
				countries[countryNum].name
			} is ${countries[countryNum].capital}.`
		);
		setTimeout(question, 5000);
	} else {
		$("#timer").text(`Time left: ${timeLimit}`);
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
	$("#answers").empty();
	if (capitals.includes(input)) {
		correct++;
		$("#left").html(
			`<h1>That is correct! ${
				countries[countryNum].capital
			} is the captial of ${countries[countryNum].name}.`
		);
		setTimeout(question, 5000);
	} else {
		incorrect++;
		$("#left").html(
			`<h1>${input} is incorrect, ${
				countries[countryNum].capital
			} is the captial of ${countries[countryNum].name}.`
		);
		setTimeout(question, 5000);
	}
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
