var countries = ["Afghanistan", "Colombia", "Algeria", "Egypt"];

var Afghanistan = { capital: "Kabul" };
var Colombia = { capital: "Bogotá" };
var Algeria = { capital: "Algiers" };
var Egypt = { capital: "Cairo" };

var timeLimit = 10;

function startUp() {
	var gameStart = `<p>To begin playing, click the start button. You will have ${timeLimit} seconds to answer each question.</p><button type="button" class="btn btn-primary btn-lg">Start</button>`;
	$("#main").empty();
	$("#main").append(gameStart);
	$(".btn").click(firstQuestion);
}

function pickCountry(){
  var rando = 
}

function firstQuestion() {
	$("#main").empty();
}

$(document).ready(startUp);
